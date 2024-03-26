import * as R from 'ramda'
import {Box, ButtonBase, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import prettyBytes from 'pretty-bytes';

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
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Fragments</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(documents).map(([file, {creation_date, file_size, file_type, ref_doc_ids}]) => (
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
              <TableCell align="left">{file_type}</TableCell>
              <TableCell align="left">{ref_doc_ids.length}</TableCell>
              <TableCell align="left">{prettyBytes(file_size)}</TableCell>
              <TableCell align="left">{creation_date}</TableCell>
              <TableCell>
                <ButtonBase onClick={()=>deleteDocument(file)} sx={{
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
