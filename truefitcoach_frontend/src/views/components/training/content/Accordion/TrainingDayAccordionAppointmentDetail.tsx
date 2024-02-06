import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { useEffect, useRef, useState } from "react";
import AppointmentType from "@/models/pages/training/AppointmentType";
import { useTheme } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import { Divider, Grid, useMediaQuery } from "@mui/material";
import Fade from "@mui/material/Fade";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface TrainingDayAccordionAppointmentDetailProps {
  trainerAppointment?: AppointmentType;
  selectedDayColor: string;
  handleSelectedAppointmentTrainer: (TrainerName: string | null) => void;
}

export default function TrainingDayAccordionAppointmentDetail({
  trainerAppointment,
  selectedDayColor,
  handleSelectedAppointmentTrainer,
}: TrainingDayAccordionAppointmentDetailProps) {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  const BreakPointBetween_lg_xl = useMediaQuery(
    theme.breakpoints.between("lg", "xl")
  );

  const [isPressedAlert, setIsPressedAlert] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const Ref = useRef<HTMLDivElement | null>(null);

  const handleAlertOpen = () => {
    if (isAlertOpen === false) {
      setIsAlertOpen(true);
    } else if (isAlertOpen === true) {
      setIsAlertOpen(false);
    }
  };

  const handleAlertClose = () => {
    if (isAlertOpen === true) {
      setIsAlertOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (Ref.current && !Ref.current.contains(event.target as Node)) {
        handleAlertClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAlertOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: BreakPointBetween_lg_xl ? "0px" : "95px",
        width: "100%",
        minWidth: "750px",
        maxWidth: "750px",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "20px",
          gap: "10px",
          minWidth: "750px",
          maxWidth: "750px",
          width: "100%",
          height: "auto",
          marginY: "10px",
        }}
      >
        <Grid
          item
          xs={7.2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: "auto",
            gap: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "800",
              color: "white",
              textTransform: "uppercase",
              marginLeft: "10px",
            }}
          >
            {trainerAppointment?.AppointmentName}
          </Typography>
        </Grid>

        <Grid
          item
          xs={3.6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
            height: "auto",
            flexDirection: "column",
          }}
        >
          {" "}
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "700",
              color: selectedDayColor,
              textTransform: "uppercase",
            }}
          >
            {trainerAppointment?.Days[0].DDMMYY}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "700",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            {trainerAppointment?.Days[0].Time}
          </Typography>
        </Grid>
      </Grid>

      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minWidth: "750px",
            maxWidth: "750px",
            height: "65%",
            paddingX: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "50%",
                height: "100%",
                borderTop: "2px solid" + selectedDayColor,
                borderLeft: "2px solid " + "white",
                borderBottom: "2px solid " + "white",
                borderRight: "2px solid " + selectedDayColor,
                borderRadius: "10%",
                flexDirection: "column",
                overflow: "auto",
                paddingX: "20px",
              }}
            >
              <Box sx={{ margin: "10px 0px 0px 15px" }}>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "32px",
                    color: selectedDayColor,
                    textTransform: "uppercase",
                  }}
                >
                  Description
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "white",
                    whiteSpace: "wrap",
                  }}
                >
                  {trainerAppointment?.Description}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "50%",
                height: "100%",
                borderTop: "2px solid " + "white",
                borderLeft: "2px solid " + selectedDayColor,
                borderBottom: "2px solid " + selectedDayColor,
                borderRight: "2px solid " + "white",
                borderRadius: "10%",
                flexDirection: "column",
                overflow: "auto",
                position: "relative",
                paddingX: "20px",
              }}
            >
              <Box
                ref={Ref}
                sx={{
                  margin: "10px 0px 0px 15px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "32px",
                      color: selectedDayColor,
                      textTransform: "uppercase",
                    }}
                  >
                    <Box> Comment </Box>
                  </Typography>
                  <ErrorOutlineRoundedIcon
                    onClick={handleAlertOpen}
                    onMouseDown={() => setIsPressedAlert(true)}
                    onMouseUp={() => setIsPressedAlert(false)}
                    onMouseLeave={() => setIsPressedAlert(false)}
                    sx={{
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "24px",
                      color: selectedDayColor,
                      textTransform: "uppercase",
                    }}
                  ></ErrorOutlineRoundedIcon>
                  <Fade in={isAlertOpen} timeout={3000}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: selectedDayColor,
                        width: "150px",
                        height: "60px",
                        position: "absolute",
                        left: "112.5px",
                        top: "60px",
                        padding: "10px 10px 10px 10px",
                        borderRadius: "10px",
                        border: "3px solid " + primaryDarkColor,
                        whiteSpace: "wrap",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          right: "25%",
                          transform: "translateY(-98%)",
                          borderLeft: "6px solid transparent",
                          borderRight: "6px solid transparent",
                          borderBottom: "8px solid " + selectedDayColor,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "white",
                          textTransform: "initial",
                        }}
                      >
                        Trainers will provide feedback after training
                      </Typography>
                    </Box>
                  </Fade>
                </Box>

                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "white",
                    whiteSpace: "wrap",
                  }}
                >
                  {trainerAppointment?.Days[0].Comment}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>

      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "20px",
          marginTop: "12px",
          gap: "10px",
        }}
      >
        <Box
          onClick={() => {
            handleSelectedAppointmentTrainer(null);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            padding: "8px",
            cursor: "pointer",
            transition: "0.5s",
            bgcolor: selectedDayColor,
            borderRadius: "10px",
            // position: "absolute",
            // bottom: 15,
            // left: "52%",
            "&:hover": {
              opacity: 0.7,
            },
          }}
        >
          <ArrowBackIosNewIcon
            sx={{ color: "white", fontSize: "24px" }}
          ></ArrowBackIosNewIcon>
          <Typography
            sx={{ color: "white", fontSize: "16px", fontWeight: "500" }}
          >
            Back
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid white",
              borderRadius: "50%",
              padding: "4px",
            }}
          >
            {" "}
            <PersonIcon sx={{ color: "white", fontSize: "32px" }}></PersonIcon>
          </Box>
          <Typography
            sx={{ color: "white", fontSize: "20px", fontWeight: "700" }}
          >
            {trainerAppointment?.TrainerName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
