import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import TrainerPhoto from "../../../../../public/trainer-in-fitness-male3.png";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import CourseDialog from "./Dialog/CourseDialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import React from "react";

const CardCourse = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>,
    reason: string | null) => {
    if (reason && reason == "backdropClick") {
      return;
    }
    setOpen(false);
  };

  return (
    <Card
      sx={{
        transition: "transform 0.2s, box-shadow 0.2s", // Add a smooth transition for the hover effect
        "&:hover": {
          transform: "scale(1.01)", // Scale up the component on hover
          boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.9)", // Add a subtle shadow on hover
        },
      }}
    >
      <CardContent
        sx={{
          bgcolor: "gray",
          "&:last-child": {
            padding: 0,
          },
        }}
      >
        <Image
          alt="eiei"
          src={TrainerPhoto}
          width={500}
          height={500}
          style={{ width: "100%", height: "auto" }}
        />
        <Box
          sx={{
            padding: "2% 4%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            variant="h6"
            fontSize={14}
            fontWeight={500}
            sx={{ color: "white" }}
          >
            CID012
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {""}
            {/* Header Title */}
            Exercise Course for reduce fat and make muscle
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography
              variant="h6"
              fontSize={16}
              fontWeight={500}
              sx={{ color: "white" }}
            >
              Dechanuphap Anuwan
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1%",
                color: "orange",
                alignItems: "center",
              }}
            >
              {"5.0"}
              <Rating defaultValue={5} size="small" readOnly />
              {"(1)"}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>3 times/week</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleClickOpen}
              sx={{
                width: "fit-content",
                color: "black",
                bgcolor: "rgba(255, 165, 0, 0.9)",
              }}
            >
              See more
            </Button>
          </Box>
        </Box>
      </CardContent>

      <CourseDialog open={open} setOpen={setOpen} handleClose={handleClose} />
    </Card>
  );
};

export default CardCourse;
