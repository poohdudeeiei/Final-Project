import { Box } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import CardTrainer from "@/views/components/find_trainer/CardTrainer";
import BottomDrawerSearch from "@/views/components/find_trainer/BottomDrawerSearch";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { styled, useTheme } from "@mui/system";
import { Paper, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { findForm, BottomDrawerProps } from "@/models/pages/find_trainers";
import FindTrainerPagination from "@/views/components/find_trainer/Pagination";
import TrainerDetail from "@/views/components/find_trainer/dataMock";
import { TrainerDetailType } from "@/models/pages/find_trainers";
import useSWR from "swr";
import { fetchTypes } from "@/services/api/fetcher";
import { GET_TRAINING_TYPES } from "@/services/endpoint/global";

const options1 = [
  "Option 1",
  "Option 2",
  // Add more options as needed
];

const sf = [
  "best price",
  "popular",
  "handsome",
  "best rated",
  // Add more options as needed
];

const options2 = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  // Add more options as needed
];

//purpose
const defaultValues: findForm = {
  keyword: "",
  province: "",
  district: "",
  shortcutFilter: "",
};

export default function find_trainers() {

  const { data: trainingType, error } = useSWR(GET_TRAINING_TYPES, fetchTypes);

  // const getTypeArray = trainingType?.purpose.reduce(
  //   (acc: string[], type: { trainingTypeName: string }) => {
  //     acc.push(type.trainingTypeName);
  //     return acc;
  //   },
  //   []
  // );


  const getTypeTraining = trainingType?.purpose.map(
    (type: { trainingTypeName: string }, index: number) => type.trainingTypeName
  );

  console.log(getTypeTraining)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [trainers, setTrainers] = useState<TrainerDetailType[]>([]);

  const onSubmit = (data: findForm) => {
    console.log(data);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    if (isDrawerOpen == false) {
      setIsDrawerOpen(true);
    }
  };

  const handleDrawerClose = () => {
    if (isDrawerOpen == true) {
      setIsDrawerOpen(false);
    }
  };

  const theme = useTheme();
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

  const RenderHomeForSmallDevices = () => {
    contentRender = (
      <Box
        sx={{
          flexDirection: "column",
          padding: "20px",
          backgroundColor: "gray",
          width: "100%",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        Trainers
        <Box
          sx={{
            flexGrow: 1,
            padding: "20px",
            width: "100%",
            backgroundColor: "",
          }}
        >
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            {trainers.map((trainer, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CardTrainer Trainer={trainer} />
              </Grid>
            ))}
          </Grid>
          <FindTrainerPagination
            setTrainers={(p) => {
              setTrainers(p);
            }}
          />
        </Box>
        <BottomDrawerSearch
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        ></BottomDrawerSearch>
        <IconButton
          onClick={handleDrawerOpen}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            left: "50%",
            bottom: "20px", // Adjust the padding bottom as needed
            position: "fixed",
            transform: "translateX(-50%)", // Center the box horizontally
            cursor: "pointer", // Add a pointer cursor for interaction
          }}
        >
          <OpenInFullIcon />
        </IconButton>
      </Box>
    );
  };

  const RenderHomeForMediumDevices = () => {
    contentRender = (
      <Box
        sx={{
          flexDirection: "column",
          padding: "20px",
          backgroundColor: "gray",
          width: "100%",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        Trainers
        <Box
          sx={{
            flexGrow: 1,
            padding: "20px",
            width: "100%",
            backgroundColor: "",
          }}
        >
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            {trainers.map((trainer, index) => (
              <Grid item xs={6} md={4} key={index}>
                <CardTrainer Trainer={trainer} />
              </Grid>
            ))}
          </Grid>
          <FindTrainerPagination
            setTrainers={(p) => {
              setTrainers(p);
            }}
          />
        </Box>
        <BottomDrawerSearch
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        ></BottomDrawerSearch>
        <IconButton
          onClick={handleDrawerOpen}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            left: "50%",
            bottom: "20px", // Adjust the padding bottom as needed
            position: "fixed",
            transform: "translateX(-50%)", // Center the box horizontally
            cursor: "pointer", // Add a pointer cursor for interaction
          }}
        >
          <OpenInFullIcon />
        </IconButton>
      </Box>
    );
  };

  const RenderHomeForBaseDevices = () => {
    contentRender = (
      <Box
        fontSize={"18px"}
        sx={{
          display: "flex",
          gap: "10px",
          backgroundColor: "white",
          height: "fit-content",
          margin: "30px",
          // padding: "20px 30px 20px 30px",
        }}
      >
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            flexDirection: "column",
            gap: "20px",
            padding: "30px 20px 30px 20px",

            width: "30%",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          Filter
          <Box
            sx={{
              width: "100%",
              backgroundColor: "",
              borderRadius: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Controller
              name="keyword"
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  placeholder="search"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",

                      legend: {
                        marginLeft: "30px",
                      },
                    },
                    "& .MuiAutocomplete-inputRoot": {
                      paddingLeft: "20px !important",
                      borderRadius: "50px",
                    },
                    "& .MuiInputLabel-outlined": {
                      paddingLeft: "20px",
                    },
                    "& .MuiInputLabel-shrink": {
                      marginLeft: "20px",
                      paddingLeft: "10px",
                      paddingRight: 0,
                      background: "white",
                    },
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "",
              borderRadius: "2rem",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Controller
              name="province"
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Autocomplete
                  value={sf.includes(value) ? value : null}
                  getOptionLabel={(option) => option}
                  onBlur={onBlur}
                  onChange={(e, newValue) => onChange(newValue)}
                  // isOptionEqualToValue={(option, value) => option === value}
                  options={sf}
                  sx={{
                    width: "50%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",
                    },
                    "& .MuiInputLabel-root": {
                      marginLeft: "30px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Province" />
                  )}
                />
              )}
            />
            <Controller
              name="district"
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Autocomplete
                  value={sf.includes(value) ? value : null}
                  getOptionLabel={(option) => option}
                  onBlur={onBlur}
                  onChange={(e, newValue) => onChange(newValue)}
                  // isOptionEqualToValue={(option, value) => option.label === value.label}
                  options={sf}
                  sx={{
                    width: "50%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",

                      legend: {
                        marginLeft: "30px",
                      },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="District" />
                  )}
                />
              )}
            />
          </Box>
          <Controller
            name="shortcutFilter"
            control={control}
            rules={{ required: false }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Autocomplete
                value={
                  getTypeTraining && getTypeTraining.includes(value)
                    ? value
                    : null
                }
                fullWidth
                getOptionLabel={(option) => option}
                onBlur={onBlur}
                onChange={(e, newValue) => onChange(newValue)}
                // isOptionEqualToValue={(option, value) => option === value}
                options={getTypeTraining ?? [""]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                  "& .MuiInputLabel-root": {
                    marginLeft: "30px",
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Purpose" />
                )}
              />
            )}
          />
          <Button
            sx={{ backgroundColor: "black" }}
            variant="contained"
            type="submit"
          >
            SEARCH
          </Button>
        </form>

        <Box
          sx={{
            flexDirection: "column",
            padding: "20px",
            backgroundColor: "rgba(255, 165, 0, 0.75)",
            width: "70%",
            height: "fit-content",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          {/* Trainers */}
          <Box
            sx={{
              flexGrow: 1,
              padding: "20px",
              width: "100%",
              backgroundColor: "",
            }}
          >
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
              {trainers.map((trainer, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <CardTrainer Trainer={trainer} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <FindTrainerPagination
            setTrainers={(p) => {
              setTrainers(p);
            }}
          />
        </Box>
      </Box>
    );
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderHomeForSmallDevices();
      break;
    case BreakPointBetween_sm_md:
      RenderHomeForSmallDevices();
      break;
    case BreakPointBetween_md_lg:
      RenderHomeForMediumDevices();
      break;
    case BreakPointBetween_lg_xl:
      RenderHomeForBaseDevices();
      break;
    case BreakPointUp_xl:
      RenderHomeForBaseDevices();
      break;
    default:
      contentRender = <Box>Home Page!</Box>;
      break;
  }

  return <>{contentRender}</>;
}
find_trainers.guestGuard = true;
