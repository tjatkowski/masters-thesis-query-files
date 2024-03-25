import React, {useState} from "react";
import {Box, Paper} from "@mui/material";
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
        py: 2,
        height: '100%'
      }}>
        <Paper elevation={2} sx={{
          padding: 2,
        }}>
          <Indices index={index} setIndex={setIndex}/>
        </Paper>

        <Paper elevation={2} sx={{
          padding: 2,
          overflow: 'hidden'
        }}>
          <Index index={index}/>
        </Paper>
      </Box>
    </>
  )
}

export default Main;
