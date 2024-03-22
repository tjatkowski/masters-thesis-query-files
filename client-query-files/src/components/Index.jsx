import React from 'react';
import {Box} from "@mui/material";
const Index = ({index}) => {
  // useEffect(() => {
  //   const fetchResources = async () => {
  //     try {
  //       const response = await fetch(Url.indices());
  //       if (!response.ok)
  //         throw new Error('Something went wrong!');
  //       const data = await response.json();
  //       setIndices(data.indices);
  //       console.log(data.indices)
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   fetchResources();
  // }, [])
  //
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (!index) return <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: 'grey.600'
  }}>Select an index</Box>;

  return (
    <div>{index}</div>
  );
};

export default Index;