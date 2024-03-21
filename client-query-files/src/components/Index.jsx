import React from 'react';
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

  return (
    <div>{index}</div>
  );
};

export default Index;