import React, {useEffect, useState} from 'react';
import Url from '../utility/Url';
import {Divider, List, ListItem, ListItemText, Paper, Theme, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Indices = () => {
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
        {indices.map((index, i) => (
          <>
            <Link style={{ textDecoration: 'none' }} to={`/index/${index}`}>
              <ListItem alignItems="flex-start" sx={{
                "&:hover": {
                  boxShadow: 1,
                },
                transition: "box-shadow 0.3s ease-in-out",
                color: 'common.black'

                // bgcolor: 'grey.400',
                // borderRadius: 2,
                // border: 1,
                // borderColor: 'primary.main'
              }}>
                <ListItemText>
                  <Typography variant="h6">
                    {index}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Link>
            <Divider variant="middle" component="li" />
          </>
        ))}
      </List>
    </>
  );
};

export default Indices;