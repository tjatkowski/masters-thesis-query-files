import React, {useState} from 'react';
import Indices from './components/Indices';
import Index from './components/Index';
import {Container, CssBaseline, Paper} from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  const [index, setIndex] = useState(null)

  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="md">
        <Paper elevation={2} sx={{
          padding: '1em',
          margin: '1em 0'
        }}>
          {index ? <Index index={index}/> : <Indices setIndex={setIndex}/>}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default App;
