import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import Box from "@mui/system/Box";

import React from "react";

export default function TrainingHeader() {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          color: primaryMainColor,
          fontWeight: "800",
          fontSize: "60px",
        }}
      >
        TRAINING
      </Typography>
      <Typography
        sx={{
          color: "white",
          fontWeight: "500",
          fontSize: "18px",
        }}
      >
        View your training by clicking on the day you want to review the details
      </Typography>
    </Box>
  );
}
