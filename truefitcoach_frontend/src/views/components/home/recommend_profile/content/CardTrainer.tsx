import Typography from "@mui/material/Typography";
import { Box, useTheme } from "@mui/system";
import Link from "next/link";
import React from "react";

export default function CardTrainer() {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  const numRowsCards = 3;
  const numColsCards = 3;

  const TrainerCards = [];

  for (let row = 0; row < numRowsCards; row++) {
    const rowCards = [];
    for (let col = 0; col < numColsCards; col++) {
      const index = row * numColsCards + col;
      rowCards.push(
        <Box
          key={index}
          sx={{
            width: "300px",
            height: "300px",
            bgcolor: primaryMainColor,
            borderRadius: "10px",
            margin: "30px",
          }}
        ></Box>
      );
    }
    TrainerCards.push(
      <Box key={row} style={{ display: "flex" }}>
        {rowCards}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {TrainerCards}
      {/* <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Link href={"/setup/find_trainers"} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              padding: "5px 10px 5px 10px",
              fontWeight: "600",
              fontSize: "18px",
              color: "orange",
              "&:hover": {
                transition: "textDecoration 1s",
                color: "orange",
                textDecoration: "underline",
              },
            }}
          >
            Explore more
          </Typography>
        </Link>
        <ArrowRightAltIcon
          sx={{ fontSize: "30px", color: "orange" }}
        ></ArrowRightAltIcon>
      </Box> */}

    </Box>
  );
}
