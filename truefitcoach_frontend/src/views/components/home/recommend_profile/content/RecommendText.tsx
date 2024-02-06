import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function RecommendText() {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;
  return (
    <Box sx={{ textAlign: "center", lineHeight: "1.4" }}>
      <Typography
        sx={{ fontSize: "32px", color: primaryMainColor, fontWeight: 700 }}
      >
        Recommended All Categories Trainer Profiles
      </Typography>
      <Typography sx={{ fontSize: "18px", color: "black", lineHeight: "2.5" }}>
        Explore the trainer you're interested in and you can find contact with
        the profile that they're created.
      </Typography>
    </Box>
  );
}
