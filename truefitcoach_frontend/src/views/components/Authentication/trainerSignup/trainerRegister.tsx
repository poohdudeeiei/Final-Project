import React, { useEffect, useState } from "react";
import { Controller, useWatch, Control } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { TrainerRegisterPropsType } from "@/models/pages/create_trainer_profile";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/system";
import { Card, Divider, Paper, useMediaQuery } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "@emotion/styled";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgress from "@mui/material/CircularProgress";

const TypographyError = styled(Typography)({
  color: "#EF411E ",
  fontSize: "12px",
  fontWeight: "550",
  // marginTop: "5px",
});

const BoxError = styled(Box)({
  height: "30px",
  display: "flex",
  alignItems: "center",
  backgroundColor: "",
});

const FieldWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const BoxWrap = styled(Box)({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

const Header = styled(Typography)({
  color: "rgba(255,255,255,1)",
  fontWeight: "600",
  fontSize: "20px",
  marginBottom: "20px",
});

const FieldName = styled(Typography)({
  color: "rgba(255,255,255,0.8)",
  fontWeight: "500",
  fontSize: "16px",
});

const TrainerRegister: React.FC<TrainerRegisterPropsType> = ({
  loading,
  watch,
  accept,
  setAccept,
  errors,
  control,
  handleSubmit,
  onSubmit,
}) => {
  const theme = useTheme();
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

  const { firstName, lastName, nickname, phone_number, email } = watch();

  const validate = () => {
    let e = Object.keys(errors).length;
    if (
      !firstName ||
      !lastName ||
      !nickname ||
      !phone_number ||
      !email ||
      e !== 0
    ) {
      return false;
    }
    return true;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: BreakPointBetween_xs_sm
          ? "95%"
          : BreakPointBetween_sm_md
          ? "80%"
          : "70%",
        padding: BreakPointDown_sm ? "0.5rem" : "2rem 0rem",
      }}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Header>Personal Information</Header>
            <FieldWrap>
              <FieldName>First name</FieldName>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    fullWidth
                    sx={{
                      input: { color: "white", fontWeight: "500" },
                      "&::before": {
                        borderBottomColor: "white", // Change the color of the underline to white
                      },
                    }}
                    id="firstName"
                    placeholder="First Name"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              <BoxError>
                {errors.firstName && (
                  <TypographyError>{errors.firstName.message}</TypographyError>
                )}
              </BoxError>
            </FieldWrap>
            <FieldWrap>
              <FieldName>Last name</FieldName>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    fullWidth
                    sx={{
                      input: { color: "white", fontWeight: "500" },
                      "&::before": {
                        borderBottomColor: "white", // Change the color of the underline to white
                      },
                    }}
                    id="lastName"
                    placeholder="Last Name"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              <BoxError>
                {errors.lastName && (
                  <TypographyError>{errors.lastName.message}</TypographyError>
                )}
              </BoxError>
            </FieldWrap>
            <FieldWrap>
              <FieldName>Nickname</FieldName>
              <Controller
                name="nickname"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    fullWidth
                    sx={{
                      input: { color: "white", fontWeight: "500" },
                      "&::before": {
                        borderBottomColor: "white", // Change the color of the underline to white
                      },
                    }}
                    id="nickname"
                    placeholder="Nickname"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              <BoxError>
                {errors.nickname && (
                  <TypographyError>{errors.nickname.message}</TypographyError>
                )}
              </BoxError>
            </FieldWrap>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Header>Contact Information</Header>
            <FieldWrap>
              {/* <FieldName>Email</FieldName> */}
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <BoxWrap>
                    <PersonIcon sx={{ fontSize: "30px" }} />
                    <Input
                      fullWidth
                      sx={{
                        input: { color: "white", fontWeight: "500" },
                        "&::before": {
                          borderBottomColor: "white", // Change the color of the underline to white
                        },
                      }}
                      id="email"
                      placeholder="Email"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      // startAdornment={
                      //   <InputAdornment position="start">
                      //     <PersonIcon />
                      //   </InputAdornment>
                      // }
                    />
                  </BoxWrap>
                )}
              />
              <BoxError>
                {errors.email && (
                  <TypographyError>{errors.email.message}</TypographyError>
                )}
              </BoxError>
            </FieldWrap>
            <FieldWrap>
              {/* <FieldName>Phone number</FieldName> */}
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <BoxWrap>
                    <LocalPhoneIcon sx={{ fontSize: "30px" }} />
                    <Input
                      fullWidth
                      sx={{
                        input: { color: "white", fontWeight: "500" },
                        "&::before": {
                          borderBottomColor: "white", // Change the color of the underline to white
                        },
                      }}
                      id="tel"
                      placeholder="Telephone"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </BoxWrap>
                )}
              />
              <BoxError>
                {errors.phone_number && (
                  <TypographyError>
                    {errors.phone_number.message}
                  </TypographyError>
                )}
              </BoxError>
            </FieldWrap>
          </Box>
          <Box sx={{ margin: "20px 0px" }}>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  sx={{ color: "rgba(255, 165, 0, 1)" }}
                  checked={accept}
                  onChange={(e) => {
                    setAccept(e.target.checked);
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  I accept the
                  <span style={{ color: "rgba(255, 165, 0, 1)" }}>
                    {" "}
                    Terms of Use{" "}
                  </span>
                  &
                  <span style={{ color: "rgba(255, 165, 0, 1)" }}>
                    {" "}
                    Privacy Policy
                  </span>
                </Typography>
              }
              labelPlacement="end"
            />
          </Box>
          <Box
            sx={{
              margin: "2rem 0px 0rem 0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              width: "100%",
            }}
          >
            <Button
              color="primary"
              sx={{
                fontWeight: "700",
                width: "100%  ",
                height: "45px",
                borderRadius: "1rem",
              }}
              variant="contained"
              type="submit"
              // type="submit"
              disabled={!validate() || !accept || loading}
            >
              {" "}
              {loading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                <>
                  Next <NavigateNextIcon />
                </>
              )}
            </Button>
            <Box sx={{display:"flex",gap:"10px",color:"white",alignItems:"center"}}>
              <Typography>Already has an account?</Typography>
              <Link
                href="/auth/signIn"
                style={{
                  color: "rgba(255, 165, 0, 1)",
                  fontWeight: "700",
                  textDecoration: "none",
                  width: "fit-content",
                }}
              >
                Sign In
              </Link>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default TrainerRegister;
