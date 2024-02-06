import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import Fade from "@mui/material/Fade";
import DayType from "@/models/pages/training/DayType";
import AppointmentType from "@/models/pages/training/AppointmentType";
import TrainingDayAccordionSelectTrainer from "./TrainingDayAccordionSelectTrainer";
import TrainingDayAccordionAppointmentDetail from "./TrainingDayAccordionAppointmentDetail";
import AssignmentLateRoundedIcon from "@mui/icons-material/AssignmentLateRounded";

export default function TrainingDayAccordion() {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  let contentRender;
  const BreakPointBetween_xs_sm = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );
  const BreakPointBetween_sm_md = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  const BreakPointBetween_md_lg = useMediaQuery(
    theme.breakpoints.between("md", "lg")
  );
  const BreakPointBetween_lg_xl = useMediaQuery(
    theme.breakpoints.between("lg", "xl")
  );
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));

  const [selectedAppointmentTrainer, setSelectedAppointmentTrainer] = useState<
    string | null
  >(null);
  const [Days, setDays] = useState<DayType[]>([]);
  const [Appointments, setAppointments] = useState<AppointmentType[]>([
    {
      TrainerName: "Trainer NameOne",
      AppointmentName: "Build muscle",
      Description: "Leg day!",
      Days: [
        {
          DayName: "Monday",
          DDMMYY: "17 August 2023",
          Time: "17.00PM • 1 Hour",
          Comment: "Comment from Trainer NameOne",
        },
      ],
    },
    {
      TrainerName: "Trainer NameTwo",
      AppointmentName: "Build muscle",
      Description: "Chest day!",
      Days: [
        {
          DayName: "Monday",
          DDMMYY: "17 August 2023",
          Time: "17.00PM • 1 Hour",
          Comment: "Comment from Trainer NameTwo",
        },
      ],
    },
    {
      TrainerName: "Trainer NameThree",
      AppointmentName: "Build muscle",
      Description: "Arm day!",
      Days: [
        {
          DayName: "Tuesday",
          DDMMYY: "18 August 2023",
          Time: "17.00PM • 1 Hour",
          Comment: "Comment from Trainer NameThree",
        },
      ],
    },
    {
      TrainerName: "Trainer NameFour",
      AppointmentName: "Fat Burn",
      Description: "Runnnnnnnnnnnnnnnn!",
      Days: [
        {
          DayName: "Friday",
          DDMMYY: "21 August 2023",
          Time: "17.00PM • 1 Hour",
          Comment: "Comment from Trainer NameFour",
        },
      ],
    },
  ]);

  const [AppointmentToShow, setAppointmentToShow] = useState<AppointmentType[]>(
    [
      {
        TrainerName: "None",
        AppointmentName: "",
        Description: "",
        Days: [
          {
            DayName: "",
            DDMMYY: "",
            Time: "",
            Comment: "",
          },
        ],
      },
    ]
  );

  const [trainerAppointment, setTrainerAppointment] =
    useState<AppointmentType>();

  const [selectedDay, setSelectedDay] = useState<string>("Sunday");
  const [selectedDayColor, setSelectedDayColor] = useState<string>("#F03A47");
  const [DayAssigns, setDayAssigns] = useState<string[]>([]);

  const [DaysName, setDaysName] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [DaysColor, setDaysColor] = useState([
    "#F03A47",
    "#FCA311",
    "#FD6484",
    "#00A86B",
    "#FF7F50",
    "#41A7F5",
    "#b57EDC",
  ]);
  const [NumberOfDay, setNumberOfDay] = useState(7);

  const handleDayClick = (day: DayType) => {
    setSelectedDay(day.DayName);
    if (day.DayColor) {
      setSelectedDayColor(day.DayColor);
    }
  };

  const handleSelectedAppointmentTrainer = (TrainerName: string | null) => {
    setSelectedAppointmentTrainer(TrainerName);
  };

  useEffect(() => {
    const selectAppointmentToShow = () => {
      if (selectedDay) {
        const filteredAppointments: AppointmentType[] = Appointments.filter(
          (appointment) =>
            appointment.Days.some((day) => day.DayName === selectedDay)
        );
        setAppointmentToShow(filteredAppointments);
      }
    };

    selectAppointmentToShow();
  }, [selectedDay, Appointments]);

  const RenderDayAccordion = () => {
    const daysArray: DayType[] = [];
    for (let i = 0; i < NumberOfDay; i++) {
      const day: DayType = {
        DayName: DaysName[i] || "",
        DDMMYY: "",
        Time: "",
        DayColor: DaysColor[i] || "",
      };
      daysArray.push(day);
    }
    setDays(daysArray);
  };

  useEffect(() => {
    RenderDayAccordion();
  }, []);

  useEffect(() => {
    const RenderDayToShow = () => {
      const uniqueDayNames = new Set<string>();

      for (let i = 0; i < Appointments.length; i++) {
        for (let j = 0; j < Days.length; j++) {
          const matchDay = Appointments[i].Days.find(
            (Day) => Day.DayName === Days[j].DayName
          );
          if (matchDay) {
            uniqueDayNames.add(matchDay.DayName);
          }
        }
      }

      const uniqueDayNamesArray = Array.from(uniqueDayNames);
      setDayAssigns(uniqueDayNamesArray);
    };

    RenderDayToShow();
  }, [Appointments, Days]);

  useEffect(() => {
    setSelectedAppointmentTrainer(null);
  }, [selectedDay]);

  useEffect(() => {
    const selectTrainerAppointment = () => {
      if (AppointmentToShow) {
        const filteredTrainerAppointment: AppointmentType[] =
          AppointmentToShow.filter(
            (appointment) =>
              appointment.TrainerName === selectedAppointmentTrainer &&
              appointment.Days.some((day) => day.DayName === selectedDay)
          );
        setTrainerAppointment(filteredTrainerAppointment[0]);
      }
    };

    selectTrainerAppointment();
  }, [selectedAppointmentTrainer]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "450px",
        bgcolor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "95%",
        }}
      >
        {Days.map((day, index) => (
          <Box
            key={index}
            onClick={() => handleDayClick(day)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "70px",
              height: "430px",
              bgcolor: day.DayColor,
              borderRadius: "40px",
              marginX: "5px",
              cursor: selectedDay != day.DayName ? "pointer" : "auto",
              opacity: 1,
              position: "relative",
              overflow: BreakPointBetween_lg_xl ? "auto" : "hidden",
              transition:
                "background-color 1000ms ease-in-out, flex-Grow 300ms, opacity 0.5s",
              "&:hover": {
                opacity: selectedDay != day.DayName ? 0.5 : 1,
              },
              ...(selectedDay === day.DayName && {
                flexGrow: 100,
                bgcolor: primaryDarkColor,
              }),
            }}
          >
            {DayAssigns.map((Assign, index) => (
              <Fade
                key={index}
                in={selectedDay !== day.DayName && Assign === day.DayName}
                timeout={700}
              >
                <AssignmentLateRoundedIcon
                  sx={{
                    position: "absolute",
                    bottom: 25,
                    color: "white",
                  }}
                ></AssignmentLateRoundedIcon>
              </Fade>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  selectedDay === day.DayName ? "flex-start" : "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <Typography
                sx={{
                  writingMode: "vertical-lr",
                  textOrientation: "mixed",
                  textTransform: "uppercase",
                  color: selectedDay === day.DayName ? day.DayColor : "white",
                  fontWeight: "800",
                  fontSize: selectedDay === day.DayName ? "50px" : "30px",
                  marginLeft: selectedDay === day.DayName ? "15px" : "0px",
                  transition:
                    "color 1s ease-in-out, font-size 0.5s ease-in-out",
                }}
              >
                {day.DayName}
              </Typography>

              <Divider
                orientation="vertical"
                sx={{
                  width: "3px",
                  height: selectedDay === day.DayName ? "100%" : "0%",
                  bgcolor: day.DayColor,
                  transition:
                    "height 1s ease-in-out, background-color 0.5s ease-in-out",
                }}
              ></Divider>

              {selectedDay === day.DayName &&
                selectedAppointmentTrainer === null && (
                  <Fade in={selectedDay === day.DayName} timeout={3000}>
                    <Box
                      sx={{
                        width: BreakPointBetween_lg_xl ? "125%" : "100%",
                        height: "100%",
                        marginLeft: BreakPointBetween_lg_xl ? "95px" : "0%",
                        marginTop: "-10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position:
                          selectedDay === day.DayName ? "absolute" : "relative",
                        overflow:
                          selectedDay === day.DayName ? "hidden" : "auto",
                        whiteSpace: "nowrap",
                        marginRight: "20px",
                      }}
                    >
                      <TrainingDayAccordionSelectTrainer
                        AppointmentToShow={AppointmentToShow}
                        selectedDay={selectedDay}
                        selectedDayColor={selectedDayColor}
                        handleSelectedAppointmentTrainer={
                          handleSelectedAppointmentTrainer
                        }
                      ></TrainingDayAccordionSelectTrainer>
                    </Box>
                  </Fade>
                )}

              {selectedDay === day.DayName &&
                selectedAppointmentTrainer !== null && (
                  <Fade in={selectedDay === day.DayName} timeout={2000}>
                    <Box
                      sx={{
                        width: BreakPointBetween_lg_xl ? "750px" : "100%",
                        height: "100%",
                        marginLeft: BreakPointBetween_lg_xl ? "95px" : "0%",
                        marginTop: "-10px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        position:
                          selectedDay === day.DayName ? "absolute" : "relative",
                        overflow:
                          selectedDay === day.DayName ? "hidden" : "auto",
                        whiteSpace: "nowrap",
                        marginRight: "20px",
                      }}
                    >
                      <TrainingDayAccordionAppointmentDetail
                        trainerAppointment={trainerAppointment}
                        selectedDayColor={selectedDayColor}
                        handleSelectedAppointmentTrainer={
                          handleSelectedAppointmentTrainer
                        }
                      ></TrainingDayAccordionAppointmentDetail>
                    </Box>
                  </Fade>
                )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
