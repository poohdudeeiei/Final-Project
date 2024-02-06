import React from "react";
import FirstLookLayout from "@/views/components/home/first_look/FirstLookLayout";
import Box from "@mui/system/Box";
import { useTheme } from "@mui/system";
import { Paper, useMediaQuery } from "@mui/material";
import Background1 from "../../public/trainer-in-fitness-male3.png";
import RecommendProfileLayout from "@/views/components/home/recommend_profile/RecommendProfileLayout";
import GoalCardLayout from "@/views/components/home/goal_card/GoalCardLayout";

export default function Home() {
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
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));

  const RenderHomeForSmallDevices = () => {
    contentRender = (
      <Paper
        sx={{
          backgroundImage: `url(${Background1.src})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "auto",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            overflowX: "hidden",
            display: "flex",
            width: "100vw",
            height: "auto",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: primaryMainColor + "DD",
          }}
        >
          <FirstLookLayout></FirstLookLayout>
        </Box>
      </Paper>
    );
  };

  const RenderHomeForBaseDevices = () => {
    contentRender = (
      <Box>
        <Paper
          sx={{
            backgroundImage: `url(${Background1.src})`,
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "auto",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              overflowX: "hidden",
              display: "flex",
              width: "100vw",
              height: "auto",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // bgcolor: "rgba(255, 165, 0, 0.9)",
              // bgcolor: "rgba(237, 125, 50, 0.9)",
              bgcolor: primaryMainColor + "DD",
            }}
          >
            <FirstLookLayout></FirstLookLayout>
          </Box>
        </Paper>

        <Box
          sx={{
            overflowX: "hidden",
            display: "flex",
            width: "100vw",
            height: "auto",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // bgcolor: "rgb(15, 15, 15, 1)",
            bgcolor: primaryLightColor,
          }}
        >
          <RecommendProfileLayout></RecommendProfileLayout>
        </Box>

        <Box
          sx={{
            overflowX: "hidden",
            display: "flex",
            width: "100vw",
            height: "auto",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: secondaryDarkColor + "50",
          }}
        >
          <GoalCardLayout></GoalCardLayout>
        </Box>
      </Box>
    );
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderHomeForSmallDevices();
      break;
    case BreakPointBetween_sm_md:
      RenderHomeForSmallDevices();
      break;
    case BreakPointBetween_md_lg:
      RenderHomeForSmallDevices();
      break;
    case BreakPointBetween_lg_xl:
      RenderHomeForBaseDevices();
      break;
    case BreakPointUp_xl:
      RenderHomeForBaseDevices();
      break;
    default:
      contentRender = <Box>Home Page!</Box>;
      break;
  }

  return <>{contentRender}</>;
}

Home.guestGuard = true