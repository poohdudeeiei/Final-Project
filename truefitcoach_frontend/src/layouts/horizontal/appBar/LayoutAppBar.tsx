import Box from "@mui/material/Box";
import React, { ReactNode, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeftDrawer from "@/layouts/vertical/siteBar/leftDrawer/LeftDrawer";
import { Toolbar } from "@mui/material";
import UserMenuLayout from "./content/authNav/user_menu/UserMenuLayout";
import {  useAuth } from "@/้hooks/useAuth";

type LayoutAppBar = {
  horizontalAppBarLogo: ReactNode;
  horizontalAppBarSignIn: ReactNode;
  horizontalAppBarSignUp: ReactNode;
  children: ReactNode;
  handleTrainerModeClick: () => void;
  isTrainerMode: boolean;
};

const HeaderBar = styled(Toolbar)`
  height: 70px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
`;

export default function LayoutAppBar({
  children,
  horizontalAppBarLogo,
  horizontalAppBarSignIn,
  horizontalAppBarSignUp,
  handleTrainerModeClick,
  isTrainerMode,
}: LayoutAppBar) {
  
  const auth = useAuth()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHiddenNavBar, setIsHiddenNavBar] = useState(false);

  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  const handleDrawerOpen = () => {
    if (isDrawerOpen == false) {
      setIsDrawerOpen(true);
    }
  };

  const handleDrawerClose = () => {
    if (isDrawerOpen == true) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    let prevScrollPosition = window.scrollY;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > prevScrollPosition && scrollPosition > 100) {
        setIsHiddenNavBar(true);
      } else {
        setIsHiddenNavBar(false);
      }

      prevScrollPosition = scrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const RenderLayoutForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: BreakPointBetween_lg_xl ? "100%" : "1440px",
          height: "auto",
          // position: "relative",
          top: 15,
          left: 0,
        }}
      >
        <Box sx={{ display: "flex", paddingLeft: "40px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginRight: "25px" }}>{horizontalAppBarLogo}</Box>
            <Box>{children}</Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "40px",
          }}
        >
          {auth.user === null ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              {horizontalAppBarSignIn}
              <Box sx={{ color: "white", marginX: "20px" }}>|</Box>
              {horizontalAppBarSignUp}
            </Box>
          ) : (
            <UserMenuLayout
              isTrainerMode={isTrainerMode}
              handleTrainerModeClick={handleTrainerModeClick}
            ></UserMenuLayout>
          )}

          {/* <Box> {horizontalAppBarSignIn}
          <Box sx={{ color: "white", marginX: "20px" }}>|</Box>
          {horizontalAppBarSignUp}</Box>
         

          <UserMenuLayout
            isTrainerMode={isTrainerMode}
            handleTrainerModeClick={handleTrainerModeClick}
          ></UserMenuLayout> */}
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
          height: "auto",
          position: "relative",
        }}
      >
        <LeftDrawer
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        ></LeftDrawer>

        <Box
          onClick={handleDrawerOpen}
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: 10,
            cursor: "pointer",
          }}
        >
          <MenuIcon
            sx={{
              color: "white",
              fontSize: "22px",
              "&:hover": {
                color: primaryMainColor,
              },
            }}
          ></MenuIcon>
        </Box>
        <Box>{horizontalAppBarLogo}</Box>
      </Box>
    );
    return contentRender;
  };

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
      contentRender = <Box>Header bar layout!</Box>;
      break;
  }

  return (
    <Box
      sx={{
        zIndex: 1000,
        transition: "transform 0.3s ease-in-out",
        transform: isHiddenNavBar ? "translateY(-100%)" : "translateY(0)",
        position: "fixed",
      }}
    >
      {/* <HeaderBarBackground> */}
      <HeaderBar>{contentRender}</HeaderBar>
      {/* </HeaderBarBackground> */}
    </Box>
  );
}
