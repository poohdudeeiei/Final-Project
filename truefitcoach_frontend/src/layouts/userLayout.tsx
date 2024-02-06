import { ReactNode, useEffect, useState } from "react";
import AppBar from "./horizontal/AppBar";
import HorizontalAppBarLogo from "./logo/Logo";
import HorizontalAppBarSignIn from "./horizontal/appBar/content/authNav/SignIn";
import HorizontalAppBarSignUp from "./horizontal/appBar/content/authNav/SignUp";
import HorizontalNavItems from "@/navigations/Navigations";
import React from "react";
import Box from "@mui/material/Box";
import FooterLayout from "./horizontal/footerBar/FooterLayout";
// import router from "next/router";
import TrainerNavigations from "@/navigations/TrainerNavigations";
import { useRouter } from "next/router";
import { useAuth } from "@/้hooks/useAuth";

interface UserLayoutProps {
  children: ReactNode;
  
}

export default function UserLayout({ children }: UserLayoutProps) {
  const router = useRouter();
  const [isTrainerMode, setIsTrainerMode] = useState(false);

  useEffect(() => {
    const storedIsTrainerMode = localStorage.getItem("isTrainerMode");
    if (storedIsTrainerMode === "true") {
      setIsTrainerMode(true);
      // auth.setTrainerMode()
    }
  }, []);

  const handleTrainerModeClick = () => {
    if (!isTrainerMode) {
      setIsTrainerMode(true);
      localStorage.setItem("isTrainerMode", "true");
      router.push("/trainer_mode/trainer_home");
    } else {
      setIsTrainerMode(false);
      localStorage.setItem("isTrainerMode", "false");
      router.push("/");
    }
  };

  return (
    <Box>
      <AppBar
        isTrainerMode={isTrainerMode}
        handleTrainerModeClick={handleTrainerModeClick}
        TrainerNavigations={TrainerNavigations()}
        horizontalNavItems={HorizontalNavItems()}
        horizontalAppBarLogo={
          <HorizontalAppBarLogo isTrainerMode={isTrainerMode} />
        }
        horizontalAppBarSignIn={<HorizontalAppBarSignIn />}
        horizontalAppBarSignUp={<HorizontalAppBarSignUp />}
      ></AppBar>

      <Box sx={{ paddingTop: "70px" }}>{children}</Box>
      <Box>
        <FooterLayout></FooterLayout>
      </Box>
    </Box>
  );
}
