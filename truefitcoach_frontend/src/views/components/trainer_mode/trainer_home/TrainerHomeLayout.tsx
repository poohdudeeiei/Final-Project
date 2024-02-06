import { useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";
import OwnTrainerProfile from "./content/OwnTrainerProfile";
import ListCustomers from "./content/ListCustomers";
import Grid from "@mui/material/Grid";
import ListCustomersDetail from "./content/ListCustomersDetail";

export default function TrainerHomeLayout() {
  const allCustomers: number[] = [1, 2, 3, 4, 5, 6];

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
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          maxWidth: "1440px",
        }}
      >
        <Grid container sx={{ width: "100%", height: "100%" }}>
          <Grid
            item
            xs={4.5}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                // border: "5px solid " + primaryMainColor,
                // padding: "15px 15px 15px 15px",
                // marginRight: "15px",
                borderRadius: "20px",
              }}
            >
              <OwnTrainerProfile></OwnTrainerProfile>
            </Box>
          </Grid>
          <Grid
            item
            xs={7.5}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              // marginBottom: "80px",
            }}
          >
            <Box
              sx={{
                marginLeft: "30px",
                width: "100%",
                height: "100%",
              }}
            >
              <ListCustomers allCustomers={allCustomers}>
                <ListCustomersDetail></ListCustomersDetail>
              </ListCustomers>
            </Box>
          </Grid>
        </Grid>
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
      contentRender = <Box>Trainer Home Layout!</Box>;
      break;
  }
  return <>{contentRender}</>;
}
