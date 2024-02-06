import { Box, bgcolor, useTheme } from "@mui/system";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserProfile from "./user_drop_down/UserProfile";
import { Typography } from "@mui/material";
import UserMenu from "@/navigations/UserMenu";
import Notification from "./notification/Notification";
import { useRouter } from "next/router";

type UserMenuLayout = {
  handleTrainerModeClick: () => void;
  isTrainerMode: boolean;
};

export default function UserMenuLayout({
  isTrainerMode,
  handleTrainerModeClick,
}: UserMenuLayout) {
  const router = useRouter();
  const theme = useTheme();
  const [isPressedTraining, setIsPressedTraining] = useState(false);

  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;
  const currentPath = router.pathname;

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
    contentRender = <Box>{/* <UserProfile></UserProfile> */}</Box>;
    return contentRender;
  };

  const RenderLayoutForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {!isTrainerMode && (
          <Box
            onClick={() => {
              router.push("/setup/training");
            }}
            onMouseDown={() => setIsPressedTraining(true)}
            onMouseUp={() => setIsPressedTraining(false)}
            onMouseLeave={() => setIsPressedTraining(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "15px",
              bgcolor:
                currentPath === "/setup/training" ? primaryMainColor : "white",
              padding: "5px 10px 5px 10px",
              borderRadius: "10px",
              transition: "transform 0.05s, background-color 0.2s",
              transform: `scale(${isPressedTraining ? 0.9 : 1})`,
              "&:hover": {
                bgcolor: primaryMainColor,
              },
            }}
          >
            <Typography
              sx={{
                color: "#1a1a1a",
                fontSize: "11px",
                fontWeight: "700",
                userSelect: "none",
                msUserSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              Training
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "15px",
          }}
        >
          <Notification></Notification>
        </Box>

        <Box>
          <UserProfile
            UserMenu={UserMenu()}
            handleTrainerModeClick={handleTrainerModeClick}
            isTrainerMode={isTrainerMode}
          ></UserProfile>
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
      contentRender = <Box>User Menu Layout!</Box>;
      break;
  }

  return <>{contentRender}</>;
}
