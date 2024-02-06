import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, {
  ReactNode,
  Children,
  cloneElement,
  useState,
  useEffect,
} from "react";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";
import {
  FieldProps,
  EventActions,
  ProcessedEvent,
} from "@aldabil/react-scheduler/types";
import Pagination from "@mui/material/Pagination";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Divider from "@mui/material/Divider";
import {
  AssignedCustomerType,
  CustomerProps,
} from "@/models/pages/trainer-mode/appointment";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";

interface ComponentListCustomerProps {
  children: ReactNode;
  pageAppoint: number;
  setPageAppoint: React.Dispatch<React.SetStateAction<number>>;
  pageAssigned: number;
  setPageAssigned: React.Dispatch<React.SetStateAction<number>>;
  listCustomer: CustomerProps[];
  courseFilters: { courseId: string; course_name: string }[];
  setFilterSelected: React.Dispatch<React.SetStateAction<string>>;
  filterSelected: string;

  allAppointmentPage: number;
  filterAssignedSelected: string;
  setFilterAssignedSelected: React.Dispatch<React.SetStateAction<string>>;
  assignedList: AssignedCustomerType[] | [];

  allAssignedPage: number;
  mutateAssign: any;
  mutateAssigned: any;
  assignedLength: number;
  isLoading: boolean;
}

export const ComponentListCustomer = ({
  children,
  pageAppoint,
  setPageAppoint,
  pageAssigned,
  setPageAssigned,
  listCustomer,
  courseFilters,
  setFilterSelected,
  filterSelected,
  allAppointmentPage,
  assignedList,
  filterAssignedSelected,
  setFilterAssignedSelected,
  allAssignedPage,
  mutateAssign,
  mutateAssigned,
  assignedLength,
  isLoading,
}: ComponentListCustomerProps) => {
  const [tab, setTab] = React.useState("customer");

  useEffect(() => {
    setPageAssigned(1);
  }, []);

  useEffect(() => {
    // Reset page state when switching tabs
    if (tab === "customer") {
      setPageAssigned(1);
    } else if (tab === "assigned") {
      setPageAppoint(1);
    }
  }, [tab]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFilterSelected(event.target.value);
    setPageAppoint(1);
  };

  const handleChangeAssignedSelect = (event: SelectChangeEvent) => {
    setFilterAssignedSelected(event.target.value);
    setPageAssigned(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageAppoint(page);
  };

  const handleAssignedPageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageAssigned(page);
  };

  const theme = useTheme();
  const secondaryLightColor = theme.palette.secondary.light;

  return (
    <Box
      sx={{
        bgcolor: "white",
        paddingBottom: "15px",
        height: "100%",
        overflow: "auto",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          padding: "10px 10px 0px 10px",
          width: "100%",
          flexDirection: "column",
          height: "100%",
          display: "flex",
          gap: "10px",
          overflow: "auto",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            fontSize: "40px",
            color: secondaryLightColor,
            fontWeight: "800",
          }}
        >
          Customer appointments
        </Typography>
        <Typography sx={{ textIndent: "30px" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </Typography>
        <Divider />
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="customer" value="customer" />
              <Tab label="assigned" value="assigned" />
              <Tab label="success" value="success" />
            </TabList>
          </Box>
          <TabPanel value="customer" sx={{ width: "100%", height: "87%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Select
                      variant="standard"
                      size="small"
                      value={filterSelected}
                      onChange={handleChangeSelect}
                      sx={{ width: "120px" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {courseFilters ? (
                        courseFilters.map((course, index) => (
                          <MenuItem value={course.course_name} key={index}>
                            {course.course_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      )}
                    </Select>
                    <FormHelperText>Select course filter</FormHelperText>
                  </Box>
                </Box>
                <Box sx={{ margin: "0px 0px 20px 0px" }}>
                  {listCustomer.map((data: any, index: number) => (
                    <Box key={index} sx={{ padding: "10px 0px" }}>
                      {Children.map(children, (child, index) => {
                        if (child) {
                          return cloneElement(child as React.ReactElement, {
                            // In case add more props
                            // ...(setEvents && { setEvents: setEvents }),
                            customer: data,
                            // setEvents: setEvents,
                            mutateAssign: mutateAssign,
                            mutateAssigned: mutateAssigned,
                            // index: index,
                          });
                        }
                        return child;
                      })}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "0px 10px",
                }}
              >
                <Pagination
                  page={pageAppoint}
                  count={allAppointmentPage}
                  onChange={handlePageChange}
                  showFirstButton
                  showLastButton
                />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="assigned" sx={{ width: "100%", height: "87%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Select
                      variant="standard"
                      size="small"
                      value={filterAssignedSelected || ""}
                      onChange={handleChangeAssignedSelect}
                      sx={{ width: "120px" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {courseFilters &&
                        courseFilters.map((course, index) => (
                          <MenuItem value={course.courseId} key={index}>
                            {course.course_name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select course filter</FormHelperText>
                  </Box>
                </Box>
                <Box sx={{ margin: "0px 0px 20px 0px", height: "100%" }}>
                  {isLoading ? (
                    <Box
                      sx={{
                        height: "250px",
                        bgcolor: "",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <CircularProgress />
                      <Typography sx={{ color: "gray" }}>Loading</Typography>
                    </Box>
                  ) : assignedList &&
                    assignedList.length >= 0 &&
                    assignedLength &&
                    assignedLength >= 0 ? (
                    assignedList.map((data: any, index: number) => (
                      <Box key={index} sx={{ padding: "10px 0px" }}>
                        {Children.map(children, (child, index) => {
                          if (child) {
                            return cloneElement(child as React.ReactElement, {
                              // In case add more props
                              // ...(setEvents && { setEvents: setEvents }),
                              assignedCustomer: data,
                              type: "assigned",
                              mutateAssigned: mutateAssigned,
                              // index: index,
                            });
                          }
                          return child;
                        })}
                      </Box>
                    ))
                  ) : (
                    <Box
                      sx={{
                        marginTop: "80px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <ErrorIcon sx={{ fontSize: "80px", color: "#135cd1" }} />
                      <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
                        No data
                      </Typography>
                      <Typography sx={{ color: "gray" }}>
                        No appointment have been assigned in this time range.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "0px 10px",
                }}
              >
                {assignedList &&
                assignedList.length >= 0 &&
                assignedLength > 0 ? (
                  <Pagination
                    page={pageAssigned}
                    count={allAssignedPage}
                    onChange={handleAssignedPageChange}
                    showFirstButton
                    showLastButton
                  />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="success">
            <Box>eiei</Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ComponentListCustomer;
