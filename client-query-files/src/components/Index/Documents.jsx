import React, {useEffect, useState} from "react";
import Url from "../../utility/Url";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DocumentsTable from './Documents/DocumentsTable'


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Documents = ({index}) => {
  const [documents, setDocuments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const refetchDocuments = () => setFetchTrigger(fetchTrigger + 1);

  const addDocument = async (event) => {
    event.preventDefault();

    const file = event?.target?.files?.[0]

    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(Url.addDocument(index), {
      method: 'POST',
      body: formData,
    });

    if (response.ok)
      refetchDocuments()
  }

  const deleteDocument = async (file_name) => {
    const response = await fetch(Url.deleteDocument(index), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({file_name})
    });

    if(response.ok)
      refetchDocuments()
  }

  useEffect(() => {
    if(!index) return

    const fetchResources = async () => {
      try {
        const response = await fetch(Url.documents(index));
        if (!response.ok)
          throw new Error('Something went wrong!');
        const data = await response.json();
        setDocuments(data.documents);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [fetchTrigger, index])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        size="small"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload document
        <VisuallyHiddenInput onInput={addDocument} type="file" />
      </Button>
      <DocumentsTable documents={documents} deleteDocument={deleteDocument} />
    </>
  )
}

export default Documents;
