import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import Url from "../../utility/Url";

const CreateIndex = ({refetchIndices}) => {
  const [indexId, _setIndexId] = React.useState('')
  const setIndexId = (event) => {
    const value = event.target.value
    _setIndexId(value.replace(/\s+/g, ''))
  }

  const submit = async () => {
    const response = await fetch(Url.createIndex(indexId), { method: 'POST' })

    if (response.ok)
      refetchIndices()
  }

  return (
    <Stack useFlexGap={true} spacing={2} sx={{
      marginBottom: 1
    }}>
      <TextField value={indexId} onChange={setIndexId} label="Index ID" variant="standard" size="small" />
      <Button onClick={submit} variant="outlined" size="small" startIcon={<AddIcon />}>Create</Button>
    </Stack>
  )
}

export default CreateIndex;
