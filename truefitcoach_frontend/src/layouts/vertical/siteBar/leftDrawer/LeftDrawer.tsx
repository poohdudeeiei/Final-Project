import React, { useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import LayoutLeftDrawer from "./content/LayoutLeftDrawer";
import LeftDrawerNavigations from "@/navigations/Navigations";
import NavigationLayout from "./content/navigation/NavigationLayout";
import Divider from "@mui/material/Divider";
import Box from "@mui/system/Box";

type handleDrawerClose = () => void;

interface LeftDrawerProps {
  isDrawerOpen: boolean;
  handleDrawerClose: handleDrawerClose;
}

export default function LeftDrawer({
  isDrawerOpen,
  handleDrawerClose,
}: LeftDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        handleDrawerClose();
      }
    }

    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen, handleDrawerClose]);

  return (
    <Drawer anchor="left" open={isDrawerOpen}>
      <Box
        ref={drawerRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Box
          sx={{
            color: "white",
            display: "flex",
            bgcolor: "#1a1a1a",
            width: "100%",
            height: "100px",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          Header
        </Box>
        <Divider color="orange"></Divider>

        <LayoutLeftDrawer>
          <NavigationLayout
            LeftDrawerNavigations={LeftDrawerNavigations()}
          ></NavigationLayout>
        </LayoutLeftDrawer>
        <Divider color="orange"></Divider>

        <Box
          sx={{
            color: "white",
            display: "flex",
            bgcolor: "#1a1a1a",
            width: "100%",
            height: "70px",
            justifyContent: "center",
          }}
        >
          Footer
        </Box>
      </Box>
    </Drawer>
  );
}
