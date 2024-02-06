import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import useSWR from "swr";
import { fetchData, fetchTypes } from "@/services/api/fetcher";
import {
  GET_DISTRICT,
  GET_PROVINCE,
  GET_SUBDISTRICT,
  GET_TRAINING_TYPES,
} from "@/services/endpoint/global";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import StarIcon from "@mui/icons-material/Star";
import { marks } from "@/views/components/find_course/props";
import Autocomplete from "@mui/material/Autocomplete";
import { object } from "yup";
import { TrainerCard } from "./TrainerCard";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface TrainerType {
  trainerId: any;
  courseName: string;
  courseImage: string;
  trainingTypeId: any;
  trainingPeriod: string;
  numDaysPerWeek: string;
  trainingTime: string;
  description: string;
  purpose: string[];
  receiving: number;
  isAvailable: boolean;
  numberOfEnroll: number;
}

export const TrainerList = ({
  courseList,
  total,
  page,
  setPage,
  wordFilter,
  setWordFilter,
}: {
  courseList: TrainerType[];
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  wordFilter: string;
  setWordFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSearch = () => {
    setPage(1)
    setWordFilter(inputRef?.current?.value || ""); // Using optional chaining
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        gap: "2rem",
        padding: "1rem 0rem",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box sx={{ maxWidth: "500px", minWidth: "200px" }}>
        <OutlinedInput
          defaultValue={wordFilter}
          inputRef={inputRef}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          placeholder="Search courses"
        />
      </Box>
      <Grid
        container
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        {courseList &&
          courseList.map((data: TrainerType, index: number) => (
            <Grid
              item
              sm={10}
              md={5.5}
              lg={3.8}
              xl={3.9}
              key={index}
              sx={{
                flexGrow: 1,
                height: "fit-content",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrainerCard course={data} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={total}
        page={page}
        onChange={handleChange}
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{ display: "flex", alignSelf: "flex-start" }}
      />
    </Box>
  );
};
