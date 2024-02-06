import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { ReactNode, useState } from "react";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { AssignedCustomerType } from "@/models/pages/trainer-mode/appointment";
import Pagination from "@mui/material/Pagination";

interface ListCustomers {
  children: ReactNode;
  allCustomers: AssignedCustomerType[];
  handleChangeComment?: (customer: AssignedCustomerType) => void;
  handleChangeCurrentEdit?: (customer: number) => void;
  totalPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filterList: { courseId: string; course_name: string }[];
}

export default function EditListCustomers({
  children,
  allCustomers,
  handleChangeComment,
  handleChangeCurrentEdit,
  totalPage,
  page,
  setPage,
  filter,
  setFilter,
  filterList,
}: ListCustomers) {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

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
  const BreakPointDown_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointUp_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const BreakPointUp_md = useMediaQuery(theme.breakpoints.up("md"));
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingBottom: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "70%",
          }}
        >
          <Typography
            sx={{
              fontSize: BreakPointUp_xl
                ? "66px"
                : BreakPointBetween_lg_xl
                ? "50px"
                : BreakPointBetween_md_lg
                ? "42px"
                : BreakPointBetween_sm_md
                ? "45px"
                : "40px",
              color: secondaryLightColor,
              fontWeight: "800",
              transition: "1s",
            }}
          >
            LIST CUSTOMERS
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
            width: "20%",
          }}
        >
          <FormControl
            color="warning"
            variant="standard"
            fullWidth
            sx={{
              width: "100%",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: secondaryLightColor }}
            >
              Course
            </InputLabel>
            <Select
              labelId="courseSelect-select-label"
              id="courseSelect-select"
              value={filter}
              label="Course"
              onChange={handleChange}
              sx={{
                backgroundColor: "#505050",
                paddingLeft: "5px",
                "& .MuiSelect-select": {
                  borderColor: secondaryLightColor,
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {filterList &&
                filterList.map((course, index) => (
                  <MenuItem key={index} value={course.courseId}>
                    {course.course_name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ color: secondaryLightColor }}>
              Select course filter
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          marginBottom: "3rem",
          minHeight: "440px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {allCustomers &&
          allCustomers.map((customer, index) => (
            <Box
              key={index}
              sx={{
                paddingY: "10px",
                paddingX: "20px",
                bgcolor: secondaryLightColor,
                width: BreakPointUp_md
                  ? "100%"
                  : BreakPointDown_sm
                  ? "100%"
                  : "85%",
                height: "fit-content",
                marginTop: "20px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                transition: "1s",
                "&:hover": {
                  bgcolor: secondaryLightColor,
                },
              }}
            >
              {React.Children.map(children, (child, index) => {
                if (child) {
                  return React.cloneElement(child as React.ReactElement, {
                    customer: customer,
                    ...(handleChangeComment && {
                      handleChangeComment: handleChangeComment,
                    }),
                    ...(handleChangeCurrentEdit && {
                      handleChangeCurrentEdit: handleChangeCurrentEdit,
                    }),
                    // ...(setOpen && {
                    //   setOpen: setOpen,
                    // }),
                  });
                }
                return child;
              })}
            </Box>
          ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Pagination
          shape="rounded"
          showFirstButton
          showLastButton
          count={totalPage}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
