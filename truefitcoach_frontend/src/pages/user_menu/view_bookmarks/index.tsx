import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, useTheme } from "@mui/system";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ParentList from "@/views/components/user-setting/Render-component/parentList";
import ViewBookmark from "@/views/components/user-setting/view-bookmark/views";


export default function view_bookmarks() {

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
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BreakPointDown_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointUp_md = useMediaQuery(theme.breakpoints.up("md"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointUp_lg = useMediaQuery(theme.breakpoints.up("lg"));


  const RenderTrainingForSmallDevice = () => {
    contentRender = (
      <Box>
        <Typography sx={{ color: "white" }}>View Bookmarks Page!</Typography>
      </Box>
    );
  };

  const bm = [1, 2, 3, 4, 5];

  const RenderTrainingForBaseDevice = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          padding: BreakPointDown_sm? "1rem 0rem":"1rem 2rem",
          bgcolor: secondaryDarkColor,
        }}
      >
        <Typography
          sx={{ color: "white", fontWeight: "600", fontSize: "36px" }}
        >
          Bookmark trainers
        </Typography>

        <ParentList dataBookmark={bm}>
          <ViewBookmark />
        </ParentList>
      </Box>
    );
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderTrainingForBaseDevice();
      break;
    case BreakPointBetween_sm_md:
      RenderTrainingForBaseDevice();
      break;
    case BreakPointBetween_md_lg:
      RenderTrainingForBaseDevice();
      break;
    case BreakPointBetween_lg_xl:
      RenderTrainingForBaseDevice();
      break;
    case BreakPointUp_xl:
      RenderTrainingForBaseDevice();
      break;
    default:
      contentRender = <Box>View Bookmarks Page!</Box>;
      break;
  }

  return <>{contentRender}</>;
}
