import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useTheme } from "@mui/system";

export default function GoalText() {
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
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography
          sx={{ color: primaryMainColor, fontSize: "32px", fontWeight: 700 }}
        >
          Find your trainer with exercise goals
        </Typography>
      </Box>

      <Grid container sx={{ display: "flex" }}>
        <Grid item xs={10}>
          <Box>
            <Typography sx={{ color: "white", fontSize: "18px" }}>
              Explore the fitness goals you want your trainer to train for you.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: primaryMainColor,
                fontSize: "18px",
                fontWeight: "600",
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              Other goals
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ArrowRightAltIcon
                sx={{
                  color: primaryMainColor,
                  marginLeft: "5px",
                  marginRight: "20px",
                }}
              ></ArrowRightAltIcon>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
