import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface BlankLayoutProps {
  children: ReactNode;
}
export default function BlankLayout({ children }: BlankLayoutProps) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "",
      }}
    >
      {children}
    </Box>
  );
}
