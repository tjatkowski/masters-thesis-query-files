import React from 'react';
import Indices from './components/Indices';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Container, CssBaseline, Paper} from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Paper elevation={2} sx={{
        padding: '1em',
        margin: '1em 0'
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Indices />}/>
          </Routes>
        </BrowserRouter>
      </Paper>
    </Container>
  </React.Fragment>
);

export default App;
