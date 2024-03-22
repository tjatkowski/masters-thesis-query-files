import React, {useEffect, useState} from 'react';
import Url from '../utility/Url';
import { Divider, List, ListItem } from "@mui/material";
import CreateIndex from "./Indices/CreateIndex";
import IndexListItem from "./Indices/IndexListItem";

const Indices = ({index, setIndex}) => {
  const [indices, setIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const refetchIndices = () => setFetchTrigger(fetchTrigger + 1);
  const currentIndex = compared_index => compared_index === index;


  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(Url.indices());
        if (!response.ok)
          throw new Error('Something went wrong!');
        const data = await response.json();
        setIndices(data.indices);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [fetchTrigger])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <CreateIndex refetchIndices={refetchIndices}/>
      <List>
        {indices.map((index) => (
          <>
            <Divider variant="fullWidth" component="li" />
            <ListItem sx={{
              "&:hover": {
                borderColor: 'primary.main',
              },
              border: 1,
              borderColor: currentIndex(index) ? 'primary.main' : 'transparent',
              borderRadius: 2,
              transition: theme => theme.transitions.create(['border']),
              width: '100%'
            }}>
              <IndexListItem
                currentIndex={currentIndex(index)}
                index={index}
                setIndex={setIndex}
                refetchIndices={refetchIndices}/>
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
};

export default Indices;