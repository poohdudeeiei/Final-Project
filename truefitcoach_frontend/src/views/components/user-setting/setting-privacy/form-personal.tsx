import { Dialog, Box } from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Control,
  UseFormWatch,
  UseFormHandleSubmit,
  UseFormReset,
  FieldErrors,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MuiPhoneNumber from "mui-phone-number";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormPersonalProps } from "@/models/pages/user_menu/edit-profile";
import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import { Card, Paper, useMediaQuery } from "@mui/material";

const TextCustom = styled(Typography)({
  fontSize: "16px",
  color: "rgb(0,0,0,0.7)",
  fontWeight: 500,
  marginBottom: "2px",
});

const BoxCustom = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export interface FormPersonalType {
  errors: FieldErrors<FormPersonalProps>;
  control: Control<FormPersonalProps>; // Add the control prop if needed
  handleSubmit: UseFormHandleSubmit<FormPersonalProps>; // Pass the handleSubmit prop
  onSubmit: (data: FormPersonalProps) => void;
  reset: UseFormReset<FormPersonalProps>;
}

const FormPersonal: React.FC<FormPersonalType> = ({
  errors,
  control,
  handleSubmit,
  onSubmit,
  reset,
}) => {
  const [edit, setEdit] = useState(false);

  const handleEditForm = () => {
    setEdit(true);
  };

  const handleCancelEditForm = () => {
    setEdit(false);
    reset();
  };

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
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BreakPointDown_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointUp_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            gap: "1rem",
          }}
        >
          <Box>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <TextCustom>E-mail</TextCustom>
                  <TextField
                    fullWidth
                    disabled={!edit}
                    sx={{
                      input: { color: "black", fontWeight: "500" },
                      "&::before": {
                        borderBottomColor: "white", // Change the color of the underline to white
                      },
                    }}
                    id="Email"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
            {errors.email && (
              <Typography
                sx={{
                  color: "#E32D00",
                  fontSize: "12px",
                  fontWeight: "550",
                }}
              >
                {errors.email.message}
              </Typography>
            )}
          </Box>
          <Box>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <TextCustom>Username</TextCustom>
                  <TextField
                    fullWidth
                    disabled={!edit}
                    sx={{
                      input: { color: "black", fontWeight: "500" },
                      "&::before": {
                        borderBottomColor: "white", // Change the color of the underline to white
                      },
                    }}
                    id="username"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
            {errors.username && (
              <Typography
                sx={{
                  color: "#E32D00",
                  fontSize: "12px",
                  fontWeight: "550",
                }}
              >
                {errors.username.message}
              </Typography>
            )}
          </Box>
          <BoxCustom
            sx={{ flexDirection: BreakPointDown_md ? "column" : "row" }}
          >
            <Box sx={{ width: BreakPointDown_md ? "100%" : "50%" }}>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TextCustom>First name</TextCustom>
                    <TextField
                      fullWidth
                      disabled={!edit}
                      sx={{
                        input: { color: "black", fontWeight: "500" },
                        "&::before": {
                          borderBottomColor: "white", // Change the color of the underline to white
                        },
                      }}
                      id="firstName"
                      // placeholder="title"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              {errors.first_name && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.first_name.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: BreakPointDown_md ? "100%" : "50%" }}>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TextCustom>Last name</TextCustom>
                    <TextField
                      fullWidth
                      disabled={!edit}
                      sx={{
                        input: { color: "black", fontWeight: "500" },
                        "&::before": {
                          borderBottomColor: "white", // Change the color of the underline to white
                        },
                      }}
                      id="lastName"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              {errors.last_name && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.last_name.message}
                </Typography>
              )}
            </Box>
          </BoxCustom>
          <BoxCustom
            sx={{ flexDirection: BreakPointDown_md ? "column" : "row" }}
          >
            <Box sx={{ width: BreakPointDown_md ? "100%" : "50%" }}>
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TextCustom>Phone number</TextCustom>
                    <MuiPhoneNumber
                      fullWidth
                      disabled={!edit}
                      variant="outlined"
                      onlyCountries={["th"]}
                      value={value}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              {errors.phone_number && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.phone_number.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: BreakPointDown_md ? "100%" : "50%" }}>
              <Controller
                name="birthDate"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TextCustom>Birth date</TextCustom>
                    <DatePicker
                      disabled={!edit}
                      sx={{ width: "100%" }}
                      value={dayjs(value)}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              {errors.birthDate && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.birthDate.message}
                </Typography>
              )}
            </Box>
          </BoxCustom>
          <BoxCustom
            sx={{ flexDirection: BreakPointDown_md ? "column" : "row" }}
          >
            <Box sx={{ width: BreakPointDown_md ? "100%" : "50%" }}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TextCustom>Gender</TextCustom>
                    <FormControl fullWidth>
                      <Select
                        disabled={!edit}
                        labelId="gender"
                        id="gender"
                        value={value}
                        onChange={onChange}
                      >
                        <MenuItem value={"-"}>Not specified</MenuItem>
                        <MenuItem value={"Men"}>Men</MenuItem>
                        <MenuItem value={"Women"}>Women</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
              />
              {errors.gender && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.gender.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: BreakPointDown_md ? "100%" : "50%" }}>
              <Controller
                name="congenitalDisease"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TextCustom>Congenital Disease</TextCustom>
                    <TextField
                      fullWidth
                      disabled={!edit}
                      sx={{
                        input: { color: "black", fontWeight: "500" },
                        "&::before": {
                          borderBottomColor: "white",
                        },
                      }}
                      id="congenitalDisease"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              {errors.congenitalDisease && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.congenitalDisease.message}
                </Typography>
              )}
            </Box>
          </BoxCustom>
          <Box
            sx={{
              width: "100%",
              padding: "2rem 5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "4rem",
            }}
          >
            {edit === false ? (
              <Button
                onClick={handleEditForm}
                variant="contained"
                color="secondary"
              >
                Edit Personal Detail
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleCancelEditForm}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </>
            )}
          </Box>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default FormPersonal;
