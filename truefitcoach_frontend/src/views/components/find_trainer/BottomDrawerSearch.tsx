import { Box } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { findForm, BottomDrawerProps} from "@/models/pages/find_trainers";

const sf = [
  "best price",
  "popular",
  "handsome",
  "best rated",
  // Add more options as needed
];

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isDrawerOpen,
  handleDrawerClose,
  control,
  handleSubmit,
  onSubmit, // Receive the onSubmit prop
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is not within the drawer element
      const drawer = document.getElementById("bottom-drawer");
      if (drawer && !drawer.contains(event.target as Node) && !isDrawerOpen) {
        handleDrawerClose();
      }
    };

    if (isDrawerOpen) {
      // Add the click event listener when the drawer is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove the event listener when the drawer is closed or unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen, handleDrawerClose]);

  return (
    <Drawer
      // sx={{borderRadius:"1rem"}}
      anchor="bottom"
      open={isDrawerOpen}
      onClose={handleDrawerClose}
      id="bottom-drawer"
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        style={{
          flexDirection: "column",
          gap: "20px",
          padding: "30px 20px 30px 20px",
          backgroundColor: "",
          width: "50%",
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
                onChange={(e, newValue) => {
                  e.preventDefault(); // Stop event propagation                                                                                                    here
                  onChange(newValue);
                }}
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
                onChange={(e, newValue) => {
                  e.preventDefault(); // Stop event propagation here
                  onChange(newValue);
                }}
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
              fullWidth
              value={sf.includes(value) ? value : null}
              getOptionLabel={(option) => option}
              // onBlur={onBlur}
              onChange={(e, newValue) => onChange(newValue)}
              // isOptionEqualToValue={(option, value) => option === value}
              options={sf}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
                "& .MuiInputLabel-root": {
                  marginLeft: "30px",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Shortcut Filter" />
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
      </Box>
    </Drawer>
  );
};

export default BottomDrawer;
