import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function footerLayout() {
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

  const RenderLayoutForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: BreakPointBetween_lg_xl ? "100%" : "1440px",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#b3b3b3", fontSize: "14px" }}>
            © 2023 Copyright
          </Typography>
          <Typography
            sx={{
              marginLeft: "3px",
              color: "#b3b3b3",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            TrueFitCoach.com
          </Typography>
        </Box>
      </Box>
    );
    return contentRender;
  };

  const RenderLayoutForSmallDevices = () => {
    contentRender = (
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
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#b3b3b3", fontSize: "14px" }}>
            © 2023 Copyright
          </Typography>
          <Typography
            sx={{
              marginLeft: "3px",
              color: "#b3b3b3",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            TrueFitCoach.com
          </Typography>
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
      contentRender = <Box>Footer bar layout!</Box>;
      break;
  }

  return (
    <Box sx={{}}>
      {/* <Divider
        sx={{ position: "relative", bgcolor: "#2e2c2c", width: "100%" }}
      ></Divider> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "50px",
        }}
      >
        {contentRender}
      </Box>
    </Box>
  );
}
