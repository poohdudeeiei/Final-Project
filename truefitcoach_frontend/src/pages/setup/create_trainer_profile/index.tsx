import React, { useEffect, useState } from "react";
import { typography, useTheme } from "@mui/system";
import { Card, Divider, Paper, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainerRegisterTypes } from "@/models/pages/create_trainer_profile";
import TrainerRegister from "@/views/components/Authentication/trainerSignup/trainerRegister";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Background5 from "../../../../public/video/background/background5.jpg";
import Background4 from "../../../../public/video/background/background4.jpg";
import Background3 from "../../../../public/video/background/background3.jpg";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "next/link";
import axios from "axios";
import { TRAINER_REGISTER } from "@/services/endpoint/trainer";
import { useAuth } from "@/้hooks/useAuth";
import { useRouter } from "next/router";

const steps = ["Register an account", "Registered successful"];

const defaultValues: trainerRegisterTypes = {
  firstName: "a",
  lastName: "a",
  nickname: "poohpuppydude",
  phone_number: "+66963600778",
  email: "a@gmail.com",
};

const themes = createTheme({
  palette: {
    primary: {
      main: "rgba(255, 165, 0, 1)",
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.9)",
    },
  },
});

export default function create_trainer_profile() {
  const { token,user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  // const [pageLoading, setPageLoading] = useState(false)


  // useEffect(() => {
  //   setPageLoading(true)
  //   if ((user)) {
  //     router.push('/')
  //     setPageLoading(false)
  //   }
  // }, [user, loading])

  // if(pageLoading === true){
  //   return <>eiei</>
  // }

  const schema: yup.ObjectSchema<trainerRegisterTypes> = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    nickname: yup.string().required("Nickname is required"),
    phone_number: yup.string().required("Phone number is required"),
    email: yup.string().email().required("E-mail is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<trainerRegisterTypes>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [accept, setAccept] = useState<boolean>(false);

  const onSubmit = async (data: trainerRegisterTypes) => {
    const { firstName, lastName, nickname, email, phone_number } = data;
    setLoading(true);
    try {
      const result = await axios.post(
        TRAINER_REGISTER,
        {
          trainer_first_name: firstName,
          trainer_last_name: lastName,
          nickname: nickname,
          trainer_email: email,
          phone_number: phone_number,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (result.status === 201) {
        setTimeout(() => {
          console.log(result.data?.message);
          setLoading(false);
          handleNext();
        }, 3000);
      }
    } catch (error) {
      // error handler here such as setError on field
      console.error(error);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    // finally {
    //   console.log("User updated!");
    //   setTimeout(() => {
    //     setLoading(false);
    //     handleNext();
    //   },3000)

    // }
  };

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

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <ThemeProvider theme={themes}>
      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          bgcolor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid sx={{ flexGrow: 1 }} container spacing={0}>
          <Grid item xs={12} md={7} lg={8}>
            <Box
              sx={{
                width: "100%",
                padding: "2rem 1rem",
                bgcolor: "rgb(26, 26, 26,0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  margin: "20px 0px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: BreakPointDown_sm
                      ? "20px"
                      : BreakPointBetween_sm_md
                      ? "25px"
                      : "30px",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  {activeStep === 0
                    ? "Trainer Sign Up · Personal Data"
                    : "Sign Up Successfully!"}
                </Typography>
              </Box>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                sx={{ width: "110%", padding: "20px 0px" }}
              >
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>
                        <Typography sx={{ color: "white" }}>{label}</Typography>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              {activeStep === 0 ? (
                <React.Fragment>
                  <TrainerRegister
                    loading={loading}
                    watch={watch}
                    accept={accept}
                    setAccept={setAccept}
                    errors={errors}
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, color: "white" }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Link
                    href="/"
                    style={{
                      color: "rgba(255, 165, 0, 1)",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    Click Back to Home Page!
                  </Link>
                </React.Fragment>
              )}
            </Box>
          </Grid>
          <Grid item xs={0} md={5} lg={4}>
            <Box
              sx={{
                backgroundImage:
                  activeStep === 0
                    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background5.src})`
                    : activeStep === 0
                    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background4.src})`
                    : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background3.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
