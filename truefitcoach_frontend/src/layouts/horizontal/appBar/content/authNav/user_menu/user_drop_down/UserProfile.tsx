import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UserMenuItemModel from "@/models/navigation/UserMenuItem";
import MenuDropDown from "./MenuDropDown";
import { useAuth } from "@/้hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import { ImagePath } from "@/lib/path/image";

type UserProfile = {
  UserMenu: UserMenuItemModel[];
  handleTrainerModeClick: () => void;
  isTrainerMode: boolean;
};

export default function UserProfile({
  UserMenu,
  handleTrainerModeClick,
  isTrainerMode,
}: UserProfile) {
  const [isPressedUserProfile, setIsPressedUserProfile] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();

  useEffect(() => {
    let prevScrollPosition = window.scrollY;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > prevScrollPosition) {
        setIsSubMenuOpen(false);
      }

      prevScrollPosition = scrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubMenu = () => {
    if (isSubMenuOpen === false) {
      setIsSubMenuOpen(true);
    } else if (isSubMenuOpen === true) {
      setIsSubMenuOpen(false);
    }
  };

  const handleSubMenuClose = () => {
    if (isSubMenuOpen === true) {
      setIsSubMenuOpen(false);
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
  }, [isSubMenuOpen]);

  return (
    <Box
      ref={menuRef}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        onMouseDown={() => setIsPressedUserProfile(true)}
        onMouseUp={() => setIsPressedUserProfile(false)}
        onMouseLeave={() => setIsPressedUserProfile(false)}
        onClick={handleSubMenu}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid white",
          borderRadius: "50%",
          padding: "8px 8px 8px 8px",
          position: "relative",
          cursor: "pointer",
          transform: `scale(${isPressedUserProfile ? 0.95 : 1})`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {auth && auth.user?.profile_image ? (
            <Avatar
              alt={auth.user?.username}
              src={auth ? ImagePath(auth.user?.profile_image) : ""}
            />
          ) : (
            <PersonIcon sx={{ color: "white" }} />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            borderRadius: "50%",
            padding: "3px 3px 3px 3px",
            bgcolor: "#1a1a1a",
            right: -5,
            bottom: -5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              bgcolor: "#3d3d3d",
              padding: "1px 1px 1px 1px",
            }}
          >
            <ArrowDropDownIcon
              sx={{ color: "white", fontSize: "14px" }}
            ></ArrowDropDownIcon>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <MenuDropDown
          UserMenu={UserMenu}
          isSubMenuOpen={isSubMenuOpen}
          handleSubMenuClose={handleSubMenuClose}
          handleTrainerModeClick={handleTrainerModeClick}
          isTrainerMode={isTrainerMode}
        ></MenuDropDown>
      </Box>
    </Box>
  );
}
