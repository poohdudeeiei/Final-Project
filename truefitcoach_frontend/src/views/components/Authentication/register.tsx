import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import { SignUpPropsType } from "@/models/pages/SignUp";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/system";
import { Card, Paper, useMediaQuery } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";

const Register: React.FC<SignUpPropsType> = ({
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: "80%",
        backgroundColor: "rgb(26, 26, 26,0.95)",
        padding: BreakPointDown_md
          ? "1.2rem"
          : BreakPointBetween_md_lg
          ? "2rem"
          : "3rem",
        borderRadius: "5px",
      }}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "700",
              color: "rgba(255, 165, 0, 1)",
            }}
          >
            Sign Up
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: BreakPointDown_lg ? "100%" : "70%",
              //   bgcolor: "green",
              gap: "0px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: BreakPointDown_md ? "column" : "row",
                gap: BreakPointDown_md ? "0px" : "30px",
              }}
            >
              <Box sx={{ width: "100%", margin: "1rem 0px 1rem 0px" }}>
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
                {errors.firstName && (
                  <Typography
                    sx={{
                      color: "#EF411E ",
                      fontSize: "12px",
                      fontWeight: "550",
                      marginTop: "5px",
                    }}
                  >
                    {errors.firstName.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "100%", margin: "1rem 0px 1rem 0px" }}>
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
                {errors.lastName && (
                  <Typography
                    sx={{
                      color: "#EF411E ",
                      fontSize: "12px",
                      fontWeight: "550",
                      marginTop: "5px",
                    }}
                  >
                    {errors.lastName.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ width: "100%", margin: "1rem 0px 1rem 0px" }}>
              <Controller
                name="username"
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
                    id="username"
                    placeholder="Username"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              {errors.username && (
                <Typography
                  sx={{
                    color: "#EF411E ",
                    fontSize: "12px",
                    fontWeight: "550",
                    marginTop: "5px",
                  }}
                >
                  {errors.username.message}
                </Typography>
              )}

              {/* <input type="text" className="px-4 py-2 rounded-lg border" placeholder="Username"></input> */}
            </Box>
            <Box sx={{ width: "100%", margin: "1rem 0px 1rem 0px" }}>
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
                    color: "#EF411E ",
                    fontSize: "12px",
                    fontWeight: "550",
                    marginTop: "5px",
                  }}
                >
                  {errors.email.message}
                </Typography>
              )}

              {/* <input type="text" className="px-4 py-2 rounded-lg border" placeholder="Username"></input> */}
            </Box>
            <Box sx={{ width: "100%", margin: "1rem 0px 1rem 0px" }}>
              <Controller
                name="password"
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
                    id="password"
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
                    color: "#EF411E ",
                    fontSize: "12px",
                    fontWeight: "550",
                    marginTop: "5px",
                  }}
                >
                  {errors.password.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "100%", margin: "1rem 0px 1rem 0px" }}>
              <Controller
                name="confirmPassword"
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
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
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
              {errors.confirmPassword && (
                <Typography
                  sx={{
                    color: "#EF411E ",
                    fontSize: "12px",
                    fontWeight: "550",
                    marginTop: "5px",
                  }}
                >
                  {errors.confirmPassword.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                marginTop: "0px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
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
                      fontSize: BreakPointDown_md ? "14px" : "14px",
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
          </Box>
          <Box
            sx={{
              margin: "1rem 0px 0rem 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              bgcolor: "",
              width: "100%",
            }}
          >
            {/* <Link
              href="/auth/signIn"
              style={{
                color: "rgba(255, 165, 0, 1)",
                fontWeight: "700",
                textDecoration: "none",
                width: "150px",
                backgroundColor: "",
              }}
            >
              Back to Sign In
            </Link> */}
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
                sx={{ fontWeight: "700", width: BreakPointBetween_md_lg? "70%":"70%", borderRadius: "1rem" }}
                variant="contained"
                type="submit"
                disabled={!accept}
              >
                Sign Up
              </Button>
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

export default Register;
