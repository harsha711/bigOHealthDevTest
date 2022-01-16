import React from "react";
import { Button, Stack, Paper } from "@mui/material";

export default function Pagination({ total, perPage, paginate, pageNum }) {
  const pageNumbers = [];

  for (let i = 1; i <= total / perPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ my: 2 }}
    >
      {pageNumbers.map((pageNumber) => (
        <Paper key={pageNumber}>
          <Button
            onClick={() => paginate(pageNumber)}
            variant={pageNum === pageNumber ? "contained" : "standard"}
          >
            {pageNumber}
          </Button>
        </Paper>
      ))}
    </Stack>
  );
}
