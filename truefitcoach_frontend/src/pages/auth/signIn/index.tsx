import React, { ReactNode, useState } from "react";
import BlankLayout from "@/layouts/blankLayout";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Background4 from "../../../../public/video/background/background5.jpg";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SignInType } from "@/models/pages/SignIn";
import Login from "@/views/components/Authentication/login";
import { useAuth } from "@/้hooks/useAuth";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const defaultValues: SignInType = {
  email: "suphasan.s@kkumail.com",
  password: "poohpuppydude27",
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

export default function SignIn() {
  const auth = useAuth();

  const router = useRouter();

  const [rememberMe, setRemember] = useState<boolean>(false);

  const schema: yup.ObjectSchema<SignInType> = yup.object().shape({
    email: yup.string().email().required().trim(),
    password: yup.string().required().min(8).trim(),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInType>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // console.log(process.env.NEXT_PUBLIC_ENDPOINT)

  const onSubmit = async (data: SignInType) => {
    // console.log(data);
    const { email, password } = data;
    auth.login({ email, password, setError });
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

  return (
    <ThemeProvider theme={themes}>
      <Box
        sx={{
          userSelect: "none",
          width: BreakPointDown_lg ? "100%" : "80%",
          height: "fit-content",
          boxShadow:
            "rgba(255, 255, 255, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          maxWidth: "1440px",
        }}
      >
        <Grid sx={{ flexGrow: 1 }} container spacing={0}>
          <Grid item xs={0} md={0} lg={6} sx={{}}>
            <Box
              sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(230, 230, 230, 0.5)),url(${Background4.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "80vh",
              }}
            >
              {/* <Logo/> */}
            </Box>
          </Grid>
          <Login
            rememberMe={rememberMe}
            setRemember={setRemember}
            errors={errors}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

SignIn.guestGuard = true;
SignIn.getLayout = function getLayout(page: ReactNode) {
  return <BlankLayout>{page}</BlankLayout>;
};
