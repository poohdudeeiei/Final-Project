import React from "react";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsIcon from "@mui/icons-material/Sports";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

type CardDetail = {
  Icon: React.ElementType;
  Text: string;
};

export default function GoalCard() {
  const cardDetails: CardDetail[] = [
    { Icon: FitnessCenterIcon, Text: "Strength and Muscle Gain" },
    { Icon: LocalFireDepartmentIcon, Text: "Weight Loss and Fat Burn" },
    { Icon: SportsIcon, Text: "Sports or Special Activities Preparation" },
    { Icon: HealthAndSafetyIcon, Text: "Injury Prevention" },
  ];

  const numRows = 1;
  const numCols = 4;

  const FastSearchCategory = [];

  for (let row = 0; row < numRows; row++) {
    const rowSearch = [];
    for (let col = 0; col < numCols; col++) {
      const index = row * numCols + col;
      rowSearch.push(
        <Box
          key={index}
          sx={{
            width: "300px",
            height: "450px",
            border: "3px solid rgb(44, 44, 44,0.8)",
            marginX: "20px",
            marginY: "30px",
            cursor: "pointer",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              bgcolor: "#575757",
              borderRadius: "10px",
              transition: "1s",
              "&:hover": {
                width: "90%",
                height: "95%",
                bgcolor: "#424242",
              },
            }}
          >
            <Box
              sx={{
                "&:hover": { color: "orange" },
              }}
            >
              {React.createElement(cardDetails[col].Icon, {
                sx: {
                  fontSize: 100,
                  color: "white",
                },
              })}
            </Box>

            <Box sx={{ marginTop: "20px" }}>
              <Typography
                sx={{ color: "white", fontWeight: 500, fontSize: "14px" }}
              >
                {cardDetails[col].Text}
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }
    FastSearchCategory.push(
      <Box
        key={row}
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {rowSearch}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {FastSearchCategory}
    </Box>
  );
}
