import Box from "@mui/material/Box";
import NavigateToItemModel from "@/models/navigation/NavigationItem";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Button,
  Collapse,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

type LeftDrawerNavItemsProps = {
  LeftDrawerNavigations: NavigateToItemModel[];
};

export default function LeftDrawerNavItems({
  LeftDrawerNavigations,
}: LeftDrawerNavItemsProps) {
  const theme = useTheme();
  const router = useRouter();

  const BreakPointBetween_xs_sm = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );

  const RenderMenuItem = LeftDrawerNavigations.map((item, index) => {
    const [isChildArrowOpen, setIsChildArrowOpen] = useState(false);
    const handleChildArrow = () => {
      if (isChildArrowOpen == false) {
        setIsChildArrowOpen(true);
      } else if (isChildArrowOpen == true) {
        setIsChildArrowOpen(false);
      }
    };

    return (
      <Box
        key={index}
        sx={{ display: "flex", width: "100%", flexDirection: "column" }}
      >
        <Box key={index} sx={{ display: "flex", width: "100%" }}>
          <Box
            sx={{
              width: "20%",
              display: "flex",
              color: "white",
              justifyContent: "center",
              alignItems: "center",
              marginX: "2px",
            }}
          >
            {item.icon && item.icon}
          </Box>
          <Box
            sx={{
              width: "80%",
              textTransform: "none",
            }}
          >
            {item.path && (
              <Box key={index} sx={{ display: "flex" }}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(item.path);
                  }}
                  sx={{
                    height: "45px",
                    width: item.child && item.child.length > 0 ? "80%" : "100%",
                    color: "orange",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textTransform: "none",
                    ":hover": {
                      bgcolor: "rgb(250,115,2,0.05)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "white",
                        height: "auto",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Button>

                {item.child && item.child.length > 0 && (
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "20%",
                    }}
                  >
                    {isChildArrowOpen ? (
                      <ArrowDropUpIcon
                        onClick={() => handleChildArrow()}
                        sx={{
                          fontSize: BreakPointBetween_xs_sm ? "18px" : "20px",
                          color: "white",
                        }}
                      ></ArrowDropUpIcon>
                    ) : (
                      <ArrowDropDownIcon
                        onClick={() => handleChildArrow()}
                        sx={{
                          fontSize: BreakPointBetween_xs_sm ? "18px" : "20px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      ></ArrowDropDownIcon>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Collapse in={isChildArrowOpen}>
          {item.child && item.child.length > 0 && (
            <Box sx={{ display: "flex", width: "100%", bgcolor: "#0f0f0f" }}>
              <Box sx={{ width: "100%" }}>
                {item.child.map((childItem, childIndex) => (
                  <Box key={childIndex} sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        color: "white",
                        width: "20%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginX: "2px",
                      }}
                    >
                      {childItem.subicon && childItem.subicon}
                    </Box>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(childItem.subpath);
                      }}
                      sx={{
                        height: "45px",
                        width: "80%",
                        color: "orange",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textTransform: "none",
                        ":hover": {
                          bgcolor: "rgb(250,115,2,0.05)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            color: "white",
                            height: "auto",
                          }}
                        >
                          {childItem.subtitle}
                        </Typography>
                      </Box>
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Collapse>
      </Box>
    );
  });

  return <>{RenderMenuItem}</>;
}
