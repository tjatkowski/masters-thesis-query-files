import React, {useState} from "react";
import {Box, createTheme, Paper} from "@mui/material";
import Index from "./Index";
import Indices from "./Indices";

const Main = () => {
  const [index, setIndex] = useState(null)

  return (
    <>
      <Box sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '0.5fr 1fr',
        marginTop: 2
      }}>
        <Paper elevation={2} sx={{
          padding: 2,
        }}>
          <Indices setIndex={setIndex}/>
        </Paper>

        <Paper elevation={2} sx={{
          padding: 2,
        }}>
          <Index index={index}/>
        </Paper>
      </Box>
    </>
  )
}

export default Main;
