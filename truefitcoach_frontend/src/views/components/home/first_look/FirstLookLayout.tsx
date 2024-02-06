import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import FirstLookContent from "./layout/FirstLookContent";

export default function FirstLookLayout() {
  const theme = useTheme();
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
      <Box
        sx={{
          marginLeft: "50px",
          // overflowX: "hidden",
          width: "100vw",
          height: "550px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FirstLookContent></FirstLookContent>
      </Box>
    );
    return contentRender;
  };

  const RenderLayoutForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{
          marginLeft: "50px",
          overflowX: "hidden",
          width: BreakPointBetween_lg_xl ? "100vw" : "1440px",
          height: "550px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FirstLookContent></FirstLookContent>
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
      contentRender = <Box>First Look Layout!</Box>;
      break;
  }

  return <>{contentRender}</>;
}
