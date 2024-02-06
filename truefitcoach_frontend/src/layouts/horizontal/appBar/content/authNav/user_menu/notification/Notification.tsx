import { Box, useTheme } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Collapse from "@mui/material/Collapse";
import { Divider, Typography } from "@mui/material";

export default function Notification() {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  const [isPressedNotification, setIsPressedNotification] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleSubMenu = () => {
    if (isNotificationOpen === false) {
      setIsNotificationOpen(true);
    } else if (isNotificationOpen === true) {
      setIsNotificationOpen(false);
    }
  };

  const handleSubMenuClose = () => {
    if (isNotificationOpen === true) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleSubMenuClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  useEffect(() => {
    let prevScrollPosition = window.scrollY;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > prevScrollPosition) {
        setIsNotificationOpen(false);
      }

      prevScrollPosition = scrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      ref={menuRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <NotificationsIcon
        onMouseDown={() => setIsPressedNotification(true)}
        onMouseUp={() => setIsPressedNotification(false)}
        onMouseLeave={() => setIsPressedNotification(false)}
        onClick={handleSubMenu}
        sx={{
          color: isNotificationOpen ? primaryMainColor : "white",
          fontSize: "24px",
          cursor: "pointer",
          transition: "transform 0.05s, color 0.2s",
          transform: `scale(${isPressedNotification ? 0.9 : 1})`,
          "&:hover": { color: primaryMainColor },
        }}
      ></NotificationsIcon>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 35,
          right: -10,
        }}
      >
        <Collapse in={isNotificationOpen}>
          <Box
            sx={{
              width: "300px",
              height: "600px",
              bgcolor: "#353535",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              border: "10px solid #353535",
              borderRadius: "5px",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: "5.5%",
                transform: "translateY(-98%)",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderBottom: "8px solid #353535",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                padding: "0px 5px 8px 8px",
              }}
            >
              <Typography
                sx={{ fontWeight: "500", color: "white", fontSize: "20px" }}
              >
                Notifications
              </Typography>
            </Box>
            <Divider
              sx={{ width: "95%", bgcolor: "#656565", height: "1px" }}
            ></Divider>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
