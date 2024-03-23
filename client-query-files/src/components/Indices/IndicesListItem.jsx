import {ButtonBase, Stack, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import Url from "../../utility/Url";

const IndicesListItem = ({currentIndex, index, setIndex, refetchIndices}) => {
  const deleteIndex = async () => {
    const response = await fetch(Url.deleteIndex(index), { method: 'DELETE' })

    if (response.ok)
      refetchIndices()
  }

  return (
    <Stack direction="row" justifyContent="space-around" width="100%">
      <ButtonBase onClick={() => setIndex(currentIndex ? null : index)} sx={{
        width: '100%',
        display: 'block',
        textAlign: 'left',
        "&:hover": {
          color: 'primary.main',
        },
        color: currentIndex ? 'primary.main' : 'common',
        transition: theme => theme.transitions.create(['color']),
      }}>
        <Typography variant="body1" component="div">
          {index}
        </Typography>
        <Typography variant="caption" component="div">
          Vector
        </Typography>
      </ButtonBase>
      <ButtonBase onClick={deleteIndex} sx={{
        '&:hover': {
          color: 'error.main'
        },
        transition: theme => theme.transitions.create('color'),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 1,
        paddingRight: 1
      }}>
        <DeleteIcon fontSize="small"/>
      </ButtonBase>
    </Stack>
  )
}

export default IndicesListItem;
