import React, {useEffect, useState} from 'react';
import Url from '../utility/Url';
import {Divider, List, ListItem, Typography, ButtonBase, TextField, Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Indices = ({index, setIndex}) => {
  const [indices, setIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentIndex = compared_index => compared_index === index;


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
      <Box sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr',
        marginBottom: 1
      }}>
        <TextField id="outlined-basic" label="Index ID" variant="standard" size="small" />
        <Button variant="outlined" size="small" startIcon={<AddIcon />}>Create</Button>
      </Box>

      <List sx={{ width: '100%' }}>
        {indices.map((index) => (
          <>
            <Divider variant="fullWidth" component="li" />
            <ListItem alignItems="flex-start" sx={{
              "&:hover": {
                borderColor: 'primary.main',
              },
              border: 1,
              borderColor: currentIndex(index) ? 'primary.main' : 'transparent',
              borderRadius: 2,
              transition: theme => theme.transitions.create(['border']),
            }}>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                width: '100%'
              }}>
                <ButtonBase onClick={() => setIndex(currentIndex(index) ? null : index)} sx={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'left',
                  "&:hover": {
                    color: 'primary.main',
                  },
                  color: currentIndex(index) ? 'primary.main' : 'common',
                  transition: theme => theme.transitions.create(['color']),
                }}>
                  <Typography variant="body1" component="div">
                    {index}
                  </Typography>
                  <Typography variant="caption" component="div">
                    Vector
                  </Typography>
                </ButtonBase>
                <ButtonBase sx={{
                  '&:hover': {
                    color: 'error.main'
                  },
                  transition: theme => theme.transitions.create('color'),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeft: 1,
                  borderColor: 'divider',
                  paddingLeft: 2
                }}>
                  <DeleteIcon fontSize="small" />
                </ButtonBase>
              </Box>
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
};

export default Indices;