import React, { ReactNode, useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Background4 from "../../../../public/video/background/background5.jpg";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Logo from "@/layouts/logo/Logo";
import { useTheme } from "@mui/system";
import { Card, Paper, useMediaQuery } from "@mui/material";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { SignInType, LoginPropsType } from "@/models/pages/SignIn";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login: React.FC<LoginPropsType> = ({
  rememberMe,
  setRemember,
  errors,
  control,
  handleSubmit,
  onSubmit, // Receive the onSubmit prop
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

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  
  return (
    <Grid item xs={12} md={12} lg={6}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            backgroundColor: "#1a1a1a",
            padding: "3rem",
            width: "100%",
            height: BreakPointDown_lg ? "100vh" : "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginBottom: "5%",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: BreakPointBetween_sm_md ? "36px" : "27px",
                fontWeight: "700",
                color: "rgba(255, 165, 0, 1)",
              }}
            >
              Sign In
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: BreakPointDown_sm ? "10px" : "12px",
                fontWeight: "600",
                textAlign: "center",
                width: BreakPointUp_lg
                  ? "80%"
                  : BreakPointDown_md
                  ? "100%"
                  : "80%",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries,
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "",
              width: BreakPointBetween_sm_md
                ? "90%"
                : BreakPointDown_sm
                ? "100%"
                : "80%",
            }}
          >
            <Box sx={{ backgroundColor: "", margin: "1rem 0px 1rem 0px" }}>
              <Controller
                name="email"
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
                    id="email"
                    placeholder="Email"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
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
            <Box sx={{ backgroundColor: "", margin: "1rem 0px 1rem 0px" }}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    color="primary"
                    fullWidth
                    id="password"
                    sx={{
                      input: { color: "white", fontWeight: "500" },
                      "&::before": {
                        borderBottomColor: "white",
                      },
                    }}
                    placeholder="Password"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff color="secondary" />
                          ) : (
                            <Visibility color="secondary" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <Typography
                  sx={{
                    color: "#E32D00",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  {errors.password.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: BreakPointDown_sm ? "flex-start" : "center",
                justifyContent: "space-between",
                flexDirection: BreakPointDown_sm ? "column" : "row",
                gap: BreakPointDown_sm ? "5px" : "",
              }}
            >
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    sx={{ color: "rgba(255, 165, 0, 1)" }}
                    checked={rememberMe}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: BreakPointUp_lg ? "12px" : "14px",
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    Keep me signed in ?
                  </Typography>
                }
                labelPlacement="end"
              />
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "rgba(255, 165, 0, 1)",
                    fontSize: BreakPointUp_lg ? "12px" : "14px",
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Link>
            </Box>

            <Box
              sx={{
                margin: "2rem 0px 0rem 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <Button
                fullWidth
                color="primary"
                sx={{
                  color: "black",
                  borderRadius: "1rem",
                  fontWeight: "700",
                }}
                variant="contained"
                type="submit"
              >
                Sign In
              </Button>
              <Link
                href="/auth/signUp"
                style={{
                  color: "rgba(255, 165, 0, 1)",
                  fontWeight: "700",
                  textDecoration: "none",
                  width: "fit-content",
                  justifyContent: "center",
                  display: "flex",
                  gap:"5px"
                }}
              >
              Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default Login;
