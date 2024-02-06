import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, useTheme } from "@mui/system";
import React from "react";
import TrainingDayAccordion from "./content/Accordion/TrainingDayAccordion";
import TrainingHeader from "./content/TrainingHeader";
import { Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TrainingLayout() {
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
    contentRender = <Box>Training Page!</Box>;
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
          maxWidth: "1440px",
          flexDirection: "column",
          paddingX: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "flex-end",
              width: "15%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  color: primaryMainColor,
                },
              }}
            >
              <ArrowBackIosNewIcon
                sx={{ fontSize: "42px" }}
              ></ArrowBackIosNewIcon>
              <Typography>Previous Week</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
              height: "100%",
            }}
          >
            <TrainingHeader></TrainingHeader>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "flex-end",
              width: "15%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  color: primaryMainColor,
                },
              }}
            >
              <Typography>Next Week</Typography>
              <ArrowForwardIosIcon
                sx={{ fontSize: "42px" }}
              ></ArrowForwardIosIcon>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "25px",
          }}
        >
          <TrainingDayAccordion></TrainingDayAccordion>
        </Box>
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
      contentRender = <Box>Training Layout!</Box>;
      break;
  }
  return <>{contentRender}</>;
}
