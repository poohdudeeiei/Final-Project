import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, useTheme } from "@mui/system";
import React from "react";
import TrainingLayout from "@/views/components/training/TrainingLayout";

export default function training() {
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

  const RenderTrainingForSmallDevice = () => {
    contentRender = (
      <Box>
        <TrainingLayout></TrainingLayout>
      </Box>
    );
  };

  const RenderTrainingForBaseDevice = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          minWidth: "400px",
          minHeight: "620px",
          maxWidth: "100vw",
          bgcolor: secondaryDarkColor,
        }}
      >
        <TrainingLayout></TrainingLayout>
      </Box>
    );
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderTrainingForSmallDevice();
      break;
    case BreakPointBetween_sm_md:
      RenderTrainingForSmallDevice();
      break;
    case BreakPointBetween_md_lg:
      RenderTrainingForSmallDevice();
      break;
    case BreakPointBetween_lg_xl:
      RenderTrainingForBaseDevice();
      break;
    case BreakPointUp_xl:
      RenderTrainingForBaseDevice();
      break;
    default:
      contentRender = <Box>Training Page!</Box>;
      break;
  }

  return <>{contentRender}</>;
}
