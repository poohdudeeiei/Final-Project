import React, { useState } from "react";
import Box from "@mui/material/Box";
import UserMenuItemModel from "@/models/navigation/UserMenuItem";
import Collapse from "@mui/material/Collapse";
import { Divider, Typography, useTheme, Button } from "@mui/material";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { useRouter } from "next/router";
import { useAuth } from "@/้hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import { ImagePath } from "@/lib/path/image";

type MenuDropDown = {
  UserMenu: UserMenuItemModel[];
  isSubMenuOpen: boolean;
  handleSubMenuClose: () => void;
  handleTrainerModeClick: () => void;
  isTrainerMode: boolean;
};

export default function MenuDropDown({
  UserMenu,
  isSubMenuOpen,
  handleSubMenuClose,
  handleTrainerModeClick,
  isTrainerMode,
}: MenuDropDown) {
  const router = useRouter();
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  const [isPressedTrainerMode, setIsPressedTrainerMode] = useState(false);

  const auth = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 35,
        left: -250,
      }}
    >
      <Collapse in={isSubMenuOpen}>
        <Box>
          <Box
            sx={{
              width: "280px",
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
                right: "11%",
                transform: "translateY(-98%)",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderBottom: "8px solid #353535",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "95%",
                height: "95%",
                flexDirection: "column",
                boxShadow: "0px 0px 15px #222222",
                paddingY: "10px",
                marginY: "15px",
              }}
            >
              <Box
                onClick={() => {
                  router.push("/setup/user_profile");
                }}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "90%",
                  height: "90%",
                  cursor: "pointer",
                  transition: "0.2s",
                  borderRadius: "5px",
                  padding: "8px 5px 8px 5px",
                  "&:hover": {
                    bgcolor: "#555555",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid white",
                    borderRadius: "50%",
                    padding: "6px 6px 6px 6px",
                    position: "relative",
                    marginRight: "15px",
                  }}
                >
                  {auth && auth.user?.profile_image ? (
                    <Avatar
                      alt={auth.user?.username}
                      src={auth ? ImagePath(auth.user?.profile_image) : ""}
                    />
                  ) : (
                    <PersonIcon sx={{ color: "white", fontSize: "20px" }} />
                  )}
                </Box>

                <Typography
                  sx={{ color: "white", fontWeight: "500", fontSize: "14px" }}
                >
                  {auth.user?.first_name} {auth.user?.last_name} <br />{" "}
                </Typography>
              </Box>

              <Divider
                sx={{
                  width: "90%",
                  bgcolor: "#555555",
                  height: "2px",
                  marginY: "8px",
                }}
              ></Divider>
              <Box
                onMouseDown={() => setIsPressedTrainerMode(true)}
                onMouseUp={() => setIsPressedTrainerMode(false)}
                onMouseLeave={() => setIsPressedTrainerMode(false)}
                onClick={handleTrainerModeClick}
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  bgcolor: "#575757",
                  padding: "6px 12px 6px 12px",
                  borderRadius: "10px",
                  transition: "0.03s",
                  transform: `scale(${isPressedTrainerMode ? 0.9 : 1})`,
                  "&:hover": { bgcolor: primaryMainColor },
                  gap: "5px",
                  marginBottom: "2px",
                }}
              >
                <ChangeCircleOutlinedIcon
                  sx={{ color: "white" }}
                ></ChangeCircleOutlinedIcon>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "700",
                    userSelect: "none",
                    msUserSelect: "none",
                    WebkitUserSelect: "none",
                  }}
                >
                  {isTrainerMode
                    ? "CHANGE TO USER MODE"
                    : "CHANGE TO TRAINER MODE"}
                </Typography>
              </Box>
            </Box>

            {/* <Divider
              sx={{
                width: "90%",
                bgcolor: "#3d3d3d",
                height: "2px",
                marginY: "5px",
              }}
            ></Divider> */}

            {UserMenu.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {" "}
                {item.path ? (
                  <Link
                    key={index}
                    href={item.path}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        padding: "8px 5px 8px 5px",
                        cursor: "pointer",
                        transition: "0.2s",
                        borderRadius: "5px",
                        "&:hover": {
                          bgcolor: "#555555",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          marginRight: "15px",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "500",
                          userSelect: "none",
                          msUserSelect: "none",
                          WebkitUserSelect: "none",
                        }}
                        key={index}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Link>
                ) : (
                  <Box
                    key={index}
                    onClick={item.onClick}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        padding: "8px 5px 8px 5px",
                        cursor: "pointer",
                        transition: "0.2s",
                        borderRadius: "5px",
                        "&:hover": {
                          bgcolor: "#555555",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          marginRight: "15px",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "500",
                          userSelect: "none",
                          msUserSelect: "none",
                          WebkitUserSelect: "none",
                        }}
                        key={index}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
