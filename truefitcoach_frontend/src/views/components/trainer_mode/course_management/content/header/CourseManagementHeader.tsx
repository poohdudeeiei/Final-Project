import {
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Fade from "@mui/material/Fade";
import { Dialog } from "@mui/material";
import CourseType from "@/models/pages/course_management/CourseType";
import { MutatorCallback } from "swr";

interface CourseManagementHeaderProps {
  handleIconClick: (index: number) => void;
  searchText: String;
  setSearchText: React.Dispatch<React.SetStateAction<String>>;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchOpen: boolean;
  setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteMode: boolean;
  handleSearchCourses: () => void;
  handleDeleteSelectedCourses: () => void;
  isCanDelete: boolean;
  selectedDeleteCourses: String[];
  mutateListCourses: (
    data?:
      | CourseType[]
      | Promise<CourseType[]>
      | MutatorCallback<CourseType[]>
      | undefined,
    shouldRevalidate?: boolean | undefined
  ) => Promise<any>;
}
export default function CourseManagementHeader({
  handleIconClick,
  searchText,
  setSearchText,
  setIsSearchOpen,
  isSearchOpen,
  setIsDeleteMode,
  isDeleteMode,
  handleSearchCourses,
  handleDeleteSelectedCourses,
  isCanDelete,
  selectedDeleteCourses,
  mutateListCourses,
}: CourseManagementHeaderProps) {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

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
  const BreakPointBelow_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const BreakPointBelow_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointBelow_sm = useMediaQuery(theme.breakpoints.down("sm"));

  const [icons] = useState([SearchIcon, AddIcon, DeleteIcon]);
  const [isPressedSearch, setIsPressedSearch] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <Typography
        sx={{
          fontSize: BreakPointBelow_sm
            ? "10vw"
            : BreakPointBelow_lg
            ? "6vw"
            : "62px",
          color: secondaryLightColor,
          fontWeight: "800",
          textTransform: "uppercase",
          ...(BreakPointBelow_sm && {
            textAlign: "center",
          }),
        }}
      >
        Course {BreakPointBelow_sm && <br />} Management
      </Typography>

      <Divider
        sx={{
          bgcolor: secondaryLightColor,
          width: "60%",
          height: "2px",
          minWidth: "150px",
          maxWidth: "900px",
          marginBottom: "10px",
        }}
      ></Divider>

      <Box sx={{ display: "flex", gap: "10px" }}>
        {icons &&
          icons.map((Icon, index) => (
            <Box key={index}>
              <Box
                onClick={() => {
                  handleIconClick(index);
                  if (index === 0 && isSearchOpen === false) {
                    setIsSearchOpen(true);
                  } else if (index === 0 && isSearchOpen === true) {
                    setIsSearchOpen(false);
                  } else if (
                    index !== 0 &&
                    index !== 1 &&
                    isSearchOpen === true
                  ) {
                    setIsSearchOpen(false);
                  }

                  if (index === 2 && isDeleteMode === false) {
                    setIsDeleteMode(true);
                  } else if (index === 2 && isDeleteMode === true) {
                    setIsDeleteMode(false);
                  } else if (
                    index !== 2 &&
                    index !== 1 &&
                    isDeleteMode === true
                  ) {
                    setIsDeleteMode(false);
                  }

                  if (index === 0 && isDeleteMode === true) {
                    setIsDeleteMode(false);
                  }
                  if (index === 2 && isSearchOpen === true) {
                    setIsSearchOpen(false);
                  }
                }}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  padding: "10px",
                  bgcolor: primaryDarkColor,
                  transition: "transform 0.5s, margin 1s, background-color 1s",
                  "&:hover": {
                    transform: "scale(1.2)",
                    marginX: "10px",
                    bgcolor: primaryMainColor,
                  },
                }}
              >
                <Icon sx={{ color: "white", fontSize: "32px" }}></Icon>
              </Box>
            </Box>
          ))}
      </Box>

      <Box
        sx={{
          width: "0px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          position: "relative",
          ...(isSearchOpen && {
            width: BreakPointBelow_sm ? "160px" : "300px",
          }),
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: primaryDarkColor,
            width: "0%",
            ...(isSearchOpen && {
              width: "100%",
              transition: "width 1s",
            }),
          }}
        >
          {isSearchOpen && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
              }}
            >
              <Fade in={isSearchOpen} timeout={2000}>
                <TextField
                  fullWidth
                  value={searchText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchText(event.target.value);
                  }}
                  label="Search"
                  id="searchText"
                  autoComplete="off"
                  sx={{
                    "& label.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                    },
                    "&:focus-within": {
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                      },
                    },
                    "& label": {
                      color: "white",
                    },
                    "& input": {
                      color: "white",
                    },
                  }}
                />
              </Fade>
            </Box>
          )}

          {isSearchOpen && searchText !== "" && (
            <Typography
              onMouseDown={() => setIsPressedSearch(true)}
              onMouseUp={() => setIsPressedSearch(false)}
              onMouseLeave={() => setIsPressedSearch(false)}
              onClick={() => handleSearchCourses()}
              sx={{
                cursor: "pointer",
                position: "absolute",
                left: "105%",
                color: "white",
                fontWeight: "500",
                fontSize: BreakPointBelow_sm ? "10px" : "12px",
                bgcolor: primaryDarkColor,
                padding: "10px",
                borderRadius: "5px",
                transition: "background-color 0.5s",
                transform: `scale(${isPressedSearch ? 0.9 : 1})`,
                "&:hover": {
                  bgcolor: primaryMainColor,
                },
                userSelect: "none",
                msUserSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              Search
            </Typography>
          )}

          <Fade in={isDeleteMode} timeout={300}>
            <Box
              sx={{
                width: "300px",
                height: "50px",
                marginTop: "10px",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isCanDelete === true ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <Typography
                    onClick={() => setIsDeleteDialogOpen(true)}
                    sx={{
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "white",
                      bgcolor: "#F03A47",
                      paddingX: "12px",
                      paddingY: "6px",
                      borderRadius: "10px",
                      transition: "0.3s",
                      userSelect: "none",
                      msUserSelect: "none",
                      WebkitUserSelect: "none",
                      "&:hover": {
                        bgcolor: primaryDarkColor,
                        color: "#F03A47",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    Delete
                  </Typography>

                  <Dialog
                    open={isDeleteDialogOpen}
                    onClose={() => {
                      setIsDeleteDialogOpen(false);
                    }}
                    maxWidth="xl"
                    PaperProps={{
                      sx: {
                        width: "fit-content",
                        height: "fit-content",
                        borderRadius: "10px",
                        overflow: "auto",
                        bgcolor: secondaryDarkColor,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingX: "40px",
                        paddingY: "20px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "400",
                          fontSize: BreakPointBelow_sm ? "20px" : "24px",
                          textAlign: "center",
                        }}
                      >
                        {selectedDeleteCourses.length > 0
                          ? "Are you sure to delete your course selected?"
                          : "Please select course to delete"}
                      </Typography>
                      <Box sx={{ display: "flex", gap: "15px" }}>
                        {selectedDeleteCourses.length > 0 && (
                          <Typography
                            onClick={() => {
                              handleDeleteSelectedCourses();
                              mutateListCourses();
                              setIsDeleteDialogOpen(false);
                            }}
                            sx={{
                              cursor: "pointer",
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "white",
                              bgcolor: "#F03A47",
                              paddingX: "12px",
                              paddingY: "6px",
                              borderRadius: "10px",
                              transition: "0.3s",
                              userSelect: "none",
                              msUserSelect: "none",
                              WebkitUserSelect: "none",
                              "&:hover": {
                                bgcolor: primaryDarkColor,
                                color: "#F03A47",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            Confirm
                          </Typography>
                        )}
                        <Typography
                          onClick={() => {
                            setIsDeleteDialogOpen(false);
                          }}
                          sx={{
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "white",
                            bgcolor: "#FF7F50",
                            paddingX: "12px",
                            paddingY: "6px",
                            borderRadius: "10px",
                            transition: "0.3s",
                            userSelect: "none",
                            msUserSelect: "none",
                            WebkitUserSelect: "none",
                            "&:hover": {
                              bgcolor: primaryDarkColor,
                              color: "#FF7F50",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          Cancel
                        </Typography>
                      </Box>
                    </Box>
                  </Dialog>

                  <Typography
                    onClick={() => setIsDeleteMode(false)}
                    sx={{
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "white",
                      bgcolor: "#FF7F50",
                      paddingX: "12px",
                      paddingY: "6px",
                      borderRadius: "10px",
                      transition: "0.3s",
                      userSelect: "none",
                      msUserSelect: "none",
                      WebkitUserSelect: "none",
                      "&:hover": {
                        bgcolor: primaryDarkColor,
                        color: "#FF7F50",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    Cancel
                  </Typography>
                </Box>
              ) : (
                <Typography
                  sx={{
                    color: "#F03A47",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    paddingX: "20px",
                    paddingY: "10px",
                    borderRadius: "10px",
                    bgcolor: primaryDarkColor,
                  }}
                >
                  No course to delete
                </Typography>
              )}
            </Box>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}
