import { Box, useTheme } from "@mui/system";
import React from "react";
import TrainerHomeLayout from "@/views/components/trainer_mode/trainer_home/TrainerHomeLayout";
import { useMediaQuery } from "@mui/material";

export default function trainer_home() {
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

  const RenderLayoutForSmallDevices = () => {
    contentRender = (
      <Box>
        <TrainerHomeLayout></TrainerHomeLayout>
      </Box>
    );
    return contentRender;
  };

  const RenderLayoutForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          minHeight: "620px",
          maxWidth: "100vw",
          bgcolor: secondaryDarkColor,
        }}
      >
        <TrainerHomeLayout></TrainerHomeLayout>
      </Box>
    );
    return contentRender;
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderLayoutForSmallDevices();
      break;
    case BreakPointBetween_sm_md:
      RenderLayoutForSmallDevices();
      break;
    case BreakPointBetween_md_lg:
      RenderLayoutForSmallDevices();
      break;
    case BreakPointBetween_lg_xl:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointUp_xl:
      RenderLayoutForBaseDevices();
      break;
    default:
      contentRender = <Box>Trainer Home!</Box>;
      break;
  }

  return <>{contentRender}</>;
}

trainer_home.trainerGuard = true;