import React, {useEffect, useState} from 'react';
import Main from './components/Main';
import Cookies from 'js-cookie';

import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  ToggleButton,
  Box
} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const darkModeFromCookie = Cookies.get('darkMode');
    return darkModeFromCookie === 'true';
  });

  useEffect(() => {
    Cookies.set('darkMode', darkMode, { expires: 31 });
  }, [darkMode]);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Box display="flex" height="100vh" flexDirection="column" overflow="hidden">
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
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </ToggleButton>
            </Toolbar>
          </AppBar>

          <Container sx={{flexGrow: 1, overflow: 'hidden'}} maxWidth="xl">
            <Main />
          </Container>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
