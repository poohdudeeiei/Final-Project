import { useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";
import CourseManagementLayout from "@/views/components/trainer_mode/course_management/CourseManagementLayout";

export default function course_management() {
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
    contentRender = <Box></Box>;
    return contentRender;
  };

  const RenderLayoutForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          minHeight: "90vh",
          // maxHeight: "90vh",
          maxWidth: "100vw",
          paddingBottom: "40px",
          bgcolor: secondaryDarkColor,
        }}
      >
        <CourseManagementLayout></CourseManagementLayout>
      </Box>
    );
    return contentRender;
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointBetween_sm_md:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointBetween_md_lg:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointBetween_lg_xl:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointUp_xl:
      RenderLayoutForBaseDevices();
      break;
    default:
      contentRender = <Box>Course management!</Box>;
      break;
  }

  return <>{contentRender}</>;
}

course_management.trainerGuard = true;
