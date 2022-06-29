import * as React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

import { AsyncFileSystemListExample } from "./components/examples/AsyncFileSystemExample";
import { FileSystemExample } from "./components/examples/FileSystemExample";

export default function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "#202c87",
      }}
    >
      <Container maxWidth="sm" sx={{ p: 4 }}>
        <FileSystemExample />
        <Box height={40} width={4} />
        <AsyncFileSystemListExample />
      </Container>
    </Box>
  );
}
