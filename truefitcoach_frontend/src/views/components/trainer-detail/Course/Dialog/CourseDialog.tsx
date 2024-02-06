import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Image from "next/image";
import TrainerPhoto from "../../../../../../public/trainer-in-fitness-male3.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import RenderDialogContent from "./RenderDialogContent";
import Rating from "@mui/material/Rating";

interface CourseDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClose: (
    event: React.MouseEvent<HTMLElement>,
    reason: string | null
  ) => void;
}

const CourseDialog: React.FC<CourseDialogProps> = ({
  open,
  setOpen,
  handleClose,
}) => {
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  const [currentContent, setCurrentContent] = React.useState<string>("Detail");

  const handleView = (
    event: React.MouseEvent<HTMLElement>,
    content: string
  ) => {
    if (content !== null) {
      setCurrentContent(content);
    }
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      scroll="body"
      disableEscapeKeyDown
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "80%",
            maxWidth: "1000px",
            height: "auto",
          },
        },
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          padding: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography fontSize={40} fontWeight={700}>
          Header
        </Typography>
        <Box sx={{ width: "100%", height: "auto" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "auto",
              borderRadius: "0.5rem",
              overflow: "hidden", // Hide any overflow from the child elements
            }}
          >
            <Box
              sx={{
                padding: "30% 0%",
                backgroundImage: `url(${TrainerPhoto.src})`,
                width: "100%",
                backgroundRepeat: "no-repeat",
                height: 0,
                backgroundPosition: "center",
                backgroundSize: "cover",
                filter: "blur(5px)",
              }}
            ></Box>
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "1rem",
                color: "white",
                top: 0,
                left: 0,
                padding: "10% 10%",
                backgroundImage: "linear-gradient(to right, black, white)", // Add gradient
                opacity: "0.7",
                zIndex: 0, // Place the text above the background
              }}
            >
              <Typography fontSize={18} fontWeight={700}>
                fx103
              </Typography>
              <Typography fontSize={40} fontWeight={700}>
                Exercise Course
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
              <Typography sx={{ fontWeight: "bold" }}>
                Content detail eieieieieieieieieieieieiei
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* <Image src={TrainerPhoto} alt="eiei" width={500} height={500} /> */}

        <Box>
          <ToggleButtonGroup
            value={currentContent}
            exclusive
            onChange={handleView}
          >
            <ToggleButton value="Detail" aria-label="Detail">
              Detail
            </ToggleButton>
            <ToggleButton value="Enroll" aria-label="Enroll">
              Enroll
            </ToggleButton>
            {/* <ToggleButton value="Register" aria-label="Register">
              Register
            </ToggleButton> */}
          </ToggleButtonGroup>
        </Box>
        <RenderDialogContent content={currentContent} />
      </Box>

      <DialogActions>
        <Button variant="contained" color="error" onClick={(event) => handleClose(event, null)}>Close</Button>
        {/* <Button onClick={(event) => handleClose(event, null)} autoFocus>
          Agree
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default CourseDialog;
