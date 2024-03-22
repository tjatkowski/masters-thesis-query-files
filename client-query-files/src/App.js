import React, {useState} from 'react';
import Indices from './components/Indices';
import Index from './components/Index';
import {
  Container,
  CssBaseline,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  ToggleButton
} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  const [index, setIndex] = useState(null)
  const [darkMode, setDarkMode] = useState(true)

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <AppBar position="sticky">
          <Toolbar>
            <DescriptionIcon sx={{ mr: 2 }} />
            <Typography variant="h5" fontWeight="bold">
              Query Index
            </Typography>
            <ToggleButton
              value="check"
              color="standard"
              size="small"
              selected={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              sx={{marginLeft: 'auto', borderRadius: '100%'}}
            >
              <LightbulbIcon />
            </ToggleButton>
          </Toolbar>
        </AppBar>



        <Container maxWidth="md">
          <Paper elevation={2} sx={{
            padding: '1em',
            margin: '1em 0'
          }}>
            {index ? <Index index={index}/> : <Indices setIndex={setIndex}/>}
          </Paper>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
