import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import UserLayout from "@/layouts/userLayout";
import React, { ReactElement, ReactNode } from "react";
import theme from "@/@core/provider/theme/Theme";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { NextPage } from "next/types";
import Head from "next/head";
import ThemeConfig from "@/configs/ThemeConfig";
import { AuthProvider } from "@/@core/context/AuthContext";
import { Router } from "next/router";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import GuestGuard from "@/@core/component/auth/GuestGuard";
import AuthGuard from "@/@core/component/auth/AuthGuard";
import { SnackbarProvider } from "notistack";
import TrainerGuard from "@/@core/component/auth/TrainerGuard";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
  trainerGuard?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  trainerGuard: boolean;
  children: ReactNode;
};

NProgress.configure({ showSpinner: true });

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});

Router.events.on("routeChangeError", (err, url) => {
  NProgress.done();
});

Router.events.on("routeChangeComplete", (url) => {
  NProgress.done();
});

// Additional event to show incremental progress during loading
Router.events.on("hashChangeComplete", (url) => {
  NProgress.inc();
});

const Guard = ({
  children,
  authGuard,
  guestGuard,
  trainerGuard,
}: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } 
  else if (trainerGuard && !(authGuard && guestGuard)) {
    return <TrainerGuard>{children}</TrainerGuard>;
  } 
  else {
    return <AuthGuard>{children}</AuthGuard>;
  }
};

function App({ pageProps, Component }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: ReactNode) => <UserLayout>{page}</UserLayout>);
  const trainerGuard = Component.trainerGuard ?? false;
  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;

  return (
    <>
      <Head>
        <title>{`${ThemeConfig.webSiteName}`}</title>
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <SnackbarProvider>
              <Guard
                authGuard={authGuard}
                guestGuard={guestGuard}
                trainerGuard={trainerGuard}
              >
                {" "}
                {getLayout(<Component {...pageProps} />)}
              </Guard>
            </SnackbarProvider>
          </CssBaseline>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
