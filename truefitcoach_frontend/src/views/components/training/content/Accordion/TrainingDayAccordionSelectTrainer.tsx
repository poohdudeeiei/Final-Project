import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import AppointmentType from "@/models/pages/training/AppointmentType";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import ContentPasteOffTwoToneIcon from "@mui/icons-material/ContentPasteOffTwoTone";
import { useMediaQuery } from "@mui/material";

interface TrainingDayAccordionSelectTrainerProps {
  AppointmentToShow: AppointmentType[];
  selectedDay: string;
  selectedDayColor: string;
  handleSelectedAppointmentTrainer: (TrainerName: string | null) => void;
}

export default function TrainingDayAccordionSelectTrainer({
  AppointmentToShow,
  selectedDay,
  selectedDayColor,
  handleSelectedAppointmentTrainer,
}: TrainingDayAccordionSelectTrainerProps) {
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
  const [selectedTrainer, setSelectedTrainer] = useState<string>("");
  const [isSelect, setIsSelect] = useState<boolean>(true);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSelectedTrainer(value);
  };

  const handleSelectTrainer = () => {
    if (selectedTrainer != "") {
      handleSelectedAppointmentTrainer(selectedTrainer);
    } else {
      setIsSelect(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: BreakPointBetween_lg_xl ? "0%" : "95px",
      }}
    >
      {AppointmentToShow.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <Typography
            sx={{
              color: "white",
              fontWeight: "700",
              fontSize: "24px",
            }}
          >
            Select Your Trainer to View Appointment
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid white",
              borderRadius: "50%",
              padding: "15px 15px 15px 15px",
              marginY: "20px",
            }}
          >
            <PersonIcon sx={{ fontSize: "128px", color: "white" }}></PersonIcon>
          </Box>
          <FormControl
            variant="outlined"
            sx={{
              width: "300px",
              "& label.Mui-focused": {
                color: selectedDayColor,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: selectedDayColor,
                },
              },
              "& .MuiSelect-icon": {
                color: "white",
              },
              "&:focus-within": {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: selectedDayColor,
                  },
                },
              },
              "&:not(:focus-within)": {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: selectedDayColor,
                  },
                },
              },
            }}
          >
            <InputLabel sx={{ color: "white" }}>Select Trainer</InputLabel>
            <Select
              value={selectedTrainer}
              onChange={handleChange}
              label="Trainer Name"
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: secondaryDarkColor,
                color: "white",
                "& .MuiSelect-select": {
                  color: "white",
                },
                paddingLeft: "10px",
              }}
            >
              {AppointmentToShow.map((Appointment, index) => (
                <MenuItem
                  key={index}
                  value={Appointment.TrainerName}
                  sx={{
                    width: "100%",
                    height: "40px",
                    transition: "0.2s",
                    "&:hover": { bgcolor: selectedDayColor },
                  }}
                >
                  <Typography
                    sx={{ width: "100%", height: "100%", fontWeight: "500" }}
                  >
                    {Appointment.TrainerName}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            onClick={handleSelectTrainer}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              height: "fit-content",
              bgcolor: selectedDayColor,
              borderRadius: "5px",
              padding: "6px 12px 6px 12px",
              cursor: "pointer",
              marginTop: "20px",
              transition: "0.5s",
              "&:hover": {
                opacity: 0.7,
              },
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              View Appointment
            </Typography>
          </Box>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              marginTop: "10px",
            }}
          >
            {!isSelect && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                >
                  --- Please select trainer! ---
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ContentPasteOffTwoToneIcon
            sx={{
              zIndex: 1,
              color: selectedDayColor,
              fontSize: "250px",
              position: "absolute",
              opacity: 0.1,
            }}
          ></ContentPasteOffTwoToneIcon>
          <Typography
            sx={{
              zIndex: 2,
              color: selectedDayColor,
              fontWeight: "800",
              fontSize: "42px",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            No Training Today
          </Typography>
        </Box>
      )}
    </Box>
  );
}
