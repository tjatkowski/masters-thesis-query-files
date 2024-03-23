import * as R from 'ramda'
import {Box, ButtonBase, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const DocumentsTable = ({documents, deleteDocument}) => {
  if(R.isEmpty(documents)) return (
    <Box pt={2} color="grey.600">No uploaded documents.</Box>
  )

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File</TableCell>
            <TableCell align="left">Doc ref</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(documents).map(([file, doc_ref]) => (
            <TableRow
              key={file}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack direction="row" useFlexGap={true} spacing={1}>
                  <DescriptionIcon fontSize="small" />
                  {file}
                </Stack>
              </TableCell>
              <TableCell align="left">{doc_ref}</TableCell>
              <TableCell align="right">12.6MB</TableCell>
              <TableCell>
                <ButtonBase onClick={()=>deleteDocument(doc_ref)} sx={{
                  '&:hover': {
                    color: 'error.main'
                  },
                  transition: theme => theme.transitions.create(['color'])
                }}>
                  <DeleteIcon fontSize="small" />
                </ButtonBase>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DocumentsTable
