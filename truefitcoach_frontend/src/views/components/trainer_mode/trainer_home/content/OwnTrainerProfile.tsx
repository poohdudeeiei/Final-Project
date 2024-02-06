import { Divider, FormControlLabel, Switch, Typography } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import OwnTrainerInfo from "./OwnTrainerInfo";

export default function OwnTrainerProfile() {
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
        justifyContent: "flex-start",
        alignItems: "center",
        bgcolor: secondaryLightColor,
        width: "400px",
        height: "550px",
        borderRadius: "10px",
        flexDirection: "column",
        boxShadow: "0px 0px 30px " + primaryDarkColor,
      }}
    >
      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        {/* <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
          YOUR TRAINER PROFILE
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography
              sx={{
                fontWeight: "600",
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              PRIVATE
            </Typography>
            <Box
              sx={{
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Switch
                defaultChecked
                inputProps={{ "aria-label": "ant design" }}
                color="default"
              />
            </Box>
            <Typography
              sx={{
                fontWeight: "600",
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              PUBLIC
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          marginTop: "15px",
          border: "3px solid black",
          borderRadius: "50%",
          padding: "5px 5px 5px 5px",
          bgcolor: "rgb(36, 36, 36)",
          // boxShadow: "0px 0px 5px black",
          transition: "0.5s",
          // "&:hover": {
          //   bgcolor: "rgb(255,255,255,0.2)",
          //   color: "rgb(0,0,0,0.7)",
          // },
        }}
      >
        <Box>
          <PersonIcon sx={{ fontSize: "150px", color: "white" }}></PersonIcon>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              cursor: "pointer",
              border: "4px solid " + secondaryLightColor,
              bgcolor: "rgb(36, 36, 36)",
              borderRadius: "50%",
              right: 15,
              bottom: 0,
            }}
          >
            <AddIcon
              sx={{
                color: "white",
                fontSize: "22px",
              }}
            ></AddIcon>
          </Box>
        </Box>
      </Box>

      {/* <Divider
        sx={{ marginY: "20px", bgcolor: "black", height: "1px", width: "90%" }}
      ></Divider> */}

      <Box sx={{ marginY: "15px" }}></Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <OwnTrainerInfo></OwnTrainerInfo>
      </Box>
    </Box>
  );
}
