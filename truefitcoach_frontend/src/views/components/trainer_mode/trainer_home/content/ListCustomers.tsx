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
import React, { ReactNode, useState } from "react";
import ListCustomersDetail from "./ListCustomersDetail";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";

interface ListCustomers {
  children: ReactNode;
  allCustomers: number[];
  handleChangeComment?: (customer: number) => void;
  handleChangeCurrentEdit?: (customer: number) => void;
}

export default function ListCustomers({
  children,
  allCustomers,
  handleChangeComment,
  handleChangeCurrentEdit,
}: ListCustomers) {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const customersPerPage: number = 4;

  const [courseSelect, setCourseSelect] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentPage(1);
    setCourseSelect(event.target.value as string);
  };

  const filteredCustomers = allCustomers.filter((customer) => {
    if (courseSelect === "1") {
      return customer % 3 === 1;
    } else if (courseSelect === "2") {
      return customer % 3 === 2;
    } else if (courseSelect === "3") {
      return customer % 2 === 0;
    } else if (courseSelect === "All") {
      return customer;
    }
    {
      return true;
    }
  });

  const totalPages: number = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  const indexOfLastCustomer: number = currentPage * customersPerPage;
  const indexOfFirstCustomer: number = indexOfLastCustomer - customersPerPage;
  const currentCustomers: number[] = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const handlePageClick = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers: JSX.Element[] = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).map((number) => (
    <Box
      key={number}
      onClick={() => handlePageClick(number)}
      sx={{
        marginX: "10px",
        cursor: "pointer",
        padding: "5px 5px 5px 5px",
      }}
    >
      <Typography
        sx={{
          color: "white",
          "&:hover": {
            color: primaryMainColor,
          },
          ...(currentPage === number && {
            color: primaryMainColor,
          }),
        }}
      >
        {number}
      </Typography>
    </Box>
  ));

  const handleNextPage = (): void => {
    if (indexOfLastCustomer < allCustomers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: "18%",
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
              fontSize: "66px",
              color: secondaryLightColor,
              fontWeight: "800",
            }}
          >
            LIST CUSTOMERS
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "15%",
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
              value={courseSelect}
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
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="1">Course: 1</MenuItem>
              <MenuItem value="2">Course: 2</MenuItem>
              <MenuItem value="3">Course: 3</MenuItem>
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
          height: "75%",
          minHeight: "440px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {currentCustomers.map((customer, index) => (
          <Box
            key={index}
            sx={{
              paddingY: "32px",
              paddingX: "20px",
              bgcolor: secondaryLightColor,
              width: "85%",
              height: "84px",
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
                });
              }
              return child;
            })}
          </Box>
        ))}
      </Box>

      {/*       
      <Box
        sx={{
          flex: 1,
          width: "85%",
          height: `${currentCustomers.length * 84}px`,
          marginTop: "20px",
          bgcolor: "red",
          color: "whitesmoke",
        }}
      >
        {currentCustomers.length * 84}
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "85%",
          height: "8%",
          marginBottom: "20px",
          // position: "absolute",
          // left: "30%",
          // bottom: -90,
        }}
      >
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{
            bgcolor: "#404040",
            height: "35px",
            ":hover": { bgcolor: primaryMainColor },
          }}
        >
          <Typography sx={{ color: "white" }}> Previous</Typography>
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderPageNumbers}
        </Box>
        <Button
          onClick={handleNextPage}
          disabled={
            totalPages === 1
              ? totalPages === 1
              : indexOfLastCustomer >= allCustomers.length
          }
          sx={{
            bgcolor: "#404040",
            height: "35px",
            ":hover": { bgcolor: primaryMainColor },
          }}
        >
          <Typography sx={{ color: "white" }}> Next</Typography>
        </Button>
      </Box>
    </Box>
  );
}
