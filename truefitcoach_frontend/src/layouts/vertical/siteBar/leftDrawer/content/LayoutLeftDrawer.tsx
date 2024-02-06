import { useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { ReactNode } from "react";

interface LayoutLeftDrawerProps {
  children: ReactNode;
}

export default function LayoutLeftDrawer({ children }: LayoutLeftDrawerProps) {
  //Break point
  const theme = useTheme();
  const BreakPointBetween_xs_sm = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );
  const BreakPointBetween_sm_md = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );

  return (
    <Box
      sx={{
        width: BreakPointBetween_xs_sm
          ? "200px"
          : BreakPointBetween_sm_md
          ? "220px"
          : "260px",
        height: "100%",
        bgcolor: "#1a1a1a",
        overflow: "hidden",
        transition: "width 1s",
      }}
    >
      {children}
    </Box>
  );
}
