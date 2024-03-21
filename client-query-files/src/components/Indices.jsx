import React, {useEffect, useState} from 'react';
import Url from '../utility/Url';
import {Divider, List, ListItem, ListItemText, Typography, ButtonBase} from "@mui/material";

const Indices = ({setIndex}) => {
  const [indices, setIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(Url.indices());
        if (!response.ok)
          throw new Error('Something went wrong!');
        const data = await response.json();
        setIndices(data.indices);
        console.log(data.indices)
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <List sx={{ width: '100%' }}>
        {indices.map((index) => (
          <>
            <ButtonBase onClick={() => setIndex(index)} sx={{
              width: '100%',
            }}>
              <ListItem alignItems="flex-start" sx={{
                "&:hover": {
                  boxShadow: 1,
                },
                transition: "box-shadow 0.3s ease-in-out",
                color: 'common.black'
              }}>
                <ListItemText>
                  <Typography variant="h6">
                    {index}
                  </Typography>
                </ListItemText>
              </ListItem>
            </ButtonBase>
            <Divider variant="middle" component="li" />
          </>
        ))}
      </List>
    </>
  );
};

export default Indices;