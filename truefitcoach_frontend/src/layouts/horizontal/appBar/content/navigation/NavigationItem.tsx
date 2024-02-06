import Box from "@mui/material/Box";
import NavigateToItemModel from "@/models/navigation/NavigationItem";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Collapse } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TrainerNavigateItemModel from "@/models/navigation/TrainerNavigationItem";
import { useTheme } from "@mui/system";
import { useRouter } from "next/router";

type NavigationProps = {
  horizontalNavItems: NavigateToItemModel[];
  isTrainerMode: boolean;
  TrainerNavigations: TrainerNavigateItemModel[];
};

export default function horizontalNavItems({
  horizontalNavItems,
  isTrainerMode,
  TrainerNavigations,
}: NavigationProps) {
  const theme = useTheme();
  const router = useRouter();
  const currentPath = router.pathname;

  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleSubMenuClose = (index: number) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    }
  };

  const handleSubMenuOpen = (index: number) => {
    if (openMenuIndex === null) {
      setOpenMenuIndex(index);
    } else if (openMenuIndex !== null) {
      setOpenMenuIndex(null);
      setOpenMenuIndex(index);
    }
  };

  useEffect(() => {
    let prevScrollPosition = window.scrollY;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > prevScrollPosition) {
        setOpenMenuIndex(null);
      }

      prevScrollPosition = scrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const RenderMenuItem = (
    isTrainerMode ? TrainerNavigations : horizontalNavItems
  ).map((item, index) => {
    return (
      <Box key={index}>
        {item.path && (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              width: "fit-content",
              marginRight: "25px",
            }}
          >
            <Link href={item.path} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontWeight: "500",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: currentPath === item.path ? primaryMainColor : "white",
                  height: "auto",
                  transition: "0.3s",
                  "&:hover": {
                    color: primaryMainColor,
                  },
                  userSelect: "none",
                  msUserSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                {item.title}
              </Typography>
            </Link>

            {item.child && item.child.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {openMenuIndex === index ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <ArrowDropUpIcon
                      onClick={() => handleSubMenuClose(index)}
                      sx={{
                        fontSize: "18px",
                        color:
                          openMenuIndex === index ? primaryMainColor : "white",
                        cursor: "pointer",
                        "&:hover": {
                          color: primaryMainColor,
                        },
                      }}
                    ></ArrowDropUpIcon>
                  </Box>
                ) : (
                  <ArrowDropDownIcon
                    onClick={() => handleSubMenuOpen(index)}
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      cursor: "pointer",
                      "&:hover": {
                        color: primaryMainColor,
                      },
                    }}
                  ></ArrowDropDownIcon>
                )}
              </Box>
            )}

            {item.child && item.child.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "30px",
                  position: "absolute",
                }}
              >
                <Collapse in={openMenuIndex === index}>
                  <Box>
                    <Box
                      sx={{
                        bgcolor: "#353535",
                        borderRadius: "15px",
                        // boxShadow: "5px 5px black",
                        // border: "1px solid black",
                        width: "200px",
                        padding: "10px 10px 10px 10px",
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          left: "25%",
                          transform: "translateY(-95%)",
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderBottom: "7px solid #353535",
                        },
                      }}
                    >
                      {item.child.map((childItem, childIndex) => (
                        <Box key={childIndex}>
                          <Link
                            href={childItem.subpath}
                            style={{ textDecoration: "none" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                "&:hover": {
                                  bgcolor: "#555555",
                                  borderRadius: "10px",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: "500",
                                  paddingX: "20px",
                                  paddingY: "5px",
                                  display: "flex",
                                  width: "100%",
                                  fontSize: "12px",
                                  color:
                                    currentPath === childItem.subpath
                                      ? primaryMainColor
                                      : "#a6a6a6",
                                  height: "auto",
                                  "&:hover": {
                                    color:
                                      currentPath === childItem.subpath
                                        ? primaryMainColor
                                        : "white",
                                  },
                                  userSelect: "none",
                                  msUserSelect: "none",
                                  WebkitUserSelect: "none",
                                }}
                              >
                                {childItem.subtitle}
                              </Typography>
                            </Box>
                          </Link>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  });

  return (
    <Box sx={{ display: "flex" }} ref={menuRef}>
      {RenderMenuItem}
    </Box>
  );
}
