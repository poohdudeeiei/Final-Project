import React, { ReactNode, useState } from "react";
import BlankLayout from "@/layouts/blankLayout";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { RegisterType, SignUpPropsType , FieldValues} from "@/models/pages/SignUp";
import Register from "@/views/components/Authentication/register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Background from "../../../../public/video/background/background5.jpg";
import { useTheme } from "@mui/system";
import { Card, Paper, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import authConfig from "src/configs/auth";

const defaultValues: RegisterType = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
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


export default function SignUp() {
  const router = useRouter();

  const schema: yup.ObjectSchema<RegisterType> = yup.object().shape({
    firstName: yup.string().trim().required("First Name is required*"),
    lastName: yup.string().trim().required("Last Name is required*"),
    username: yup.string().trim().required("Username is required*"),
    email: yup.string().email().trim().required("E-mail is required*"),
    password: yup.string().trim().required("Password is required*").min(3),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "New Password and Confirm Password must be the same"
      )
      .required("Confirm password is required*"),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // const auth = useAuth()

  const onSubmit = (data: RegisterType) => {
    const { firstName, lastName, username, email, password, confirmPassword } =
      data;
    axios
      .post(process.env.NEXT_PUBLIC_ENDPOINT + authConfig.registerEndpoint, {
        email: email,
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        // phoneNumber:"+66963600778"
      })
      .then(
        async (response) => {
          console.log(response.data);

          if (response.status === 201) {
            router.replace("/auth/signIn");
            console.log("Register success!")
          } else {
            router.replace(authConfig.registerEndpoint);
          }
        },
        (err) => {
          if(err.response.data.fieldError){
            if (Array.isArray(err.response.data.fieldError)) {
              const fieldsError = err.response.data.fieldError
              fieldsError.forEach((field:FieldValues) => {
                setError(field,{
                  type: 'manual', // or 'manual' or 'validate' based on your use case
                  message: `${field} already exist*`,
                })
              })
            } else {
              const field = err.response.data.fieldError
              setError(field,{
                type:"manual",
                message:err.response.data.message
              })
            }
          } else {
            console.log(err)
          }
          console.log(err);
        }
      );
  };

  const [accept, setAccept] = useState<boolean>(false);

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

  return (
    <ThemeProvider theme={themes}>
      <Box
        sx={{
          width: "100%",
          height: BreakPointDown_sm ? "100%" : "90%",
          margin: BreakPointDown_sm ? "0%" : "0% 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "rgba(255, 255, 255, 0.25) 0px 54px 55px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <Register
          accept={accept}
          setAccept={setAccept}
          errors={errors}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </Box>
    </ThemeProvider>
  );
}

SignUp.guestGuard = true;
SignUp.getLayout = function getLayout(page: ReactNode) {
  return <BlankLayout>{page}</BlankLayout>;
};
