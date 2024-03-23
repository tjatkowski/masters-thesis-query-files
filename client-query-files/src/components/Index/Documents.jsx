import React, {useEffect, useState} from "react";
import Url from "../../utility/Url";
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonBase} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

const Documents = ({index}) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const refetchDocuments = () => setFetchTrigger(fetchTrigger + 1);

  const deleteDocument = (doc_ref) => {

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
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File</TableCell>
            <TableCell align="left">Doc ref</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(documents).map(([file, doc_ref]) => (
            <TableRow
              key={file}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack direction="row" useFlexGap={true} spacing={1}>
                  <DescriptionIcon fontSize="small" />
                  {file}
                </Stack>
              </TableCell>
              <TableCell align="left">{doc_ref}</TableCell>
              <TableCell align="right">12.6MB</TableCell>
              <TableCell>
                <ButtonBase onClick={()=>deleteDocument(doc_ref)} sx={{
                  '&:hover': {
                    color: 'error.main'
                  },
                  transition: theme => theme.transitions.create(['color'])
                }}>
                  <DeleteIcon fontSize="small" />
                </ButtonBase>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Documents;
