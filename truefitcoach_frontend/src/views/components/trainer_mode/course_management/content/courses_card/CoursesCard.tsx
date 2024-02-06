import { Box, useTheme } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import CourseType from "@/models/pages/course_management/CourseType";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { Dialog, Divider, Typography, useMediaQuery } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Fade from "@mui/material/Fade";
import Checkbox from "@mui/material/Checkbox";
import { useAuth } from "@/้hooks/useAuth";
import { DELETE_COURSE } from "@/services/endpoint/courseManagement";
import { deleteCoursesFetcher } from "@/services/api/courseManagementAPI/courseManagementAPI";
import { MutatorCallback } from "swr";
import { useSnackbar } from "notistack";

interface CoursesCard {
  isTrainerManage: boolean;
  filteredSearchCourses: CourseType[];
  handleClickCardDialogOpen: (courseId: string) => void;
  isSearchOpen?: boolean;
  isDeleteMode?: boolean;
  setSelectedDeleteCourses?: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDeleteCourses?: String[];
  handleEditCourse?: (courseId: string) => void;
  mutateListCourses?: (
    data?:
      | CourseType[]
      | Promise<CourseType[]>
      | MutatorCallback<CourseType[]>
      | undefined,
    shouldRevalidate?: boolean | undefined
  ) => Promise<any>;
}

export default function CoursesCard({
  filteredSearchCourses,
  isSearchOpen,
  handleClickCardDialogOpen,
  isDeleteMode,
  setSelectedDeleteCourses,
  selectedDeleteCourses,
  handleEditCourse,
  mutateListCourses,
  isTrainerManage,
}: CoursesCard) {
  const auth = useAuth();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
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

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  let menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpenArray, setIsMenuOpenArray] = React.useState<boolean[]>(
    new Array(filteredSearchCourses.length).fill(false)
  );

  const handleMenuOpen = (index: number) => {
    setIsMenuOpenArray((prevArray) =>
      prevArray.map((value, i) => (i === index ? !value : value))
    );
  };
  const handleCloseMenu = () => {
    setIsMenuOpenArray((prevArray) => prevArray.map(() => false));
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    courseId: string
  ) => {
    event.stopPropagation();
    const checked = event.target.checked;

    if (setSelectedDeleteCourses) {
      const checked = event.target.checked;

      if (checked) {
        setSelectedDeleteCourses((prevSelected) => [...prevSelected, courseId]);
      } else {
        setSelectedDeleteCourses((prevSelected) =>
          prevSelected.filter((id) => id !== courseId)
        );
      }
    }
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.stopPropagation();
      handleCloseMenu();
      // if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      //   event.stopPropagation();
      //   handleCloseMenu();
      // }
    };

    if (isMenuOpenArray) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpenArray, setSelectedDeleteCourses, filteredSearchCourses]);

  useEffect(() => {
    setIsMenuOpenArray(() =>
      new Array(filteredSearchCourses.length).fill(false)
    );
  }, [filteredSearchCourses, setSelectedDeleteCourses]);

  return (
    <Box
      sx={{
        width: BreakPointBelow_lg ? "100%" : "97%",
        maxWidth: "1500px",
        height: filteredSearchCourses.length > 0 ? "auto" : "70vh",
        transition: "0.5s",
        bgcolor: primaryDarkColor + "99",
        paddingX: "20px",
        paddingY: "60px",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(isTrainerManage === true && {
          marginTop: isSearchOpen || isDeleteMode ? "20px" : "-40px",
        }),
      }}
    >
      {filteredSearchCourses.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {filteredSearchCourses.map((course, index) => (
            <Box
              key={index}
              onClick={(event) => {
                event.stopPropagation();
                if (
                  course &&
                  course.courseId !== null &&
                  course.courseId !== undefined
                ) {
                  handleClickCardDialogOpen(course.courseId);
                }
              }}
              sx={{
                overflow: "hidden",
                width: BreakPointBelow_sm
                  ? "90vw"
                  : BreakPointBelow_lg
                  ? "420px"
                  : "450px",
                height: "400px",
                bgcolor: primaryDarkColor,
                borderRadius: "20px",
                justifySelf: "flex-start",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "box-shadow 0.2s, transform 0.5s",
                "&:hover": {
                  boxShadow: "0px 0px 40px " + primaryDarkColor,
                  transform: "scale(1.015)",
                },
                position: "relative",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  position: "absolute",
                  marginTop: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    bgcolor: secondaryDarkColor,
                    width: "fit-content",
                    maxWidth: "75%",
                    height: "fit-content",
                    maxHeight: "70%",
                    borderRadius: "20px",
                    padding: "4px 14px 4px 14px",
                    border: "2px solid " + secondaryLightColor,
                    textAlign: "center",
                    wordWrap: "break-word",
                    position: "relative",
                    overflowY: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      wordWrap: "break-word",
                      fontSize: BreakPointBelow_sm ? "4vw" : "16px",
                    }}
                  >
                    {course.courseName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      wordWrap: "break-word",
                      fontSize: BreakPointBelow_sm ? "4vw" : "16px",
                      marginX: "5px",
                    }}
                  >
                    :
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        course.isAvailable === true ? "#00A86B" : "#F03A47",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      fontSize: BreakPointBelow_sm ? "4vw" : "16px",
                    }}
                  >
                    {course.isAvailable === true ? "Available" : "Full"}
                  </Typography>
                </Box>
              </Box>

              {isTrainerManage === true && isDeleteMode === false && (
                <Box
                  sx={{
                    position: "absolute",
                    right: 15,
                    top: 20,
                  }}
                >
                  {" "}
                  <MoreHorizIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      handleMenuOpen(index);
                    }}
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      color: "white",
                      alignSelf: "center",
                      borderRadius: "50%",
                      padding: "3px",
                      fontSize: "24px",
                      border: "2px solid " + secondaryLightColor,
                      transition: "0.5s",
                      "&:hover": {
                        // bgcolor: primaryDarkColor,
                        borderColor: primaryMainColor,
                        color: primaryMainColor,
                        transform: "scale(1.2)",
                      },
                    }}
                  ></MoreHorizIcon>
                  <Fade in={isMenuOpenArray[index]} timeout={300}>
                    <Box
                      ref={menuRef}
                      sx={{
                        position: "absolute",
                        top: BreakPointBelow_sm ? "40px" : "35px",
                        right: BreakPointBelow_sm
                          ? "60px"
                          : BreakPointBelow_lg
                          ? "60px"
                          : "60px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Typography
                          onClick={(event) => {
                            event.stopPropagation();
                            if (
                              course &&
                              course.courseId !== null &&
                              course.courseId !== undefined
                            ) {
                              handleClickCardDialogOpen(course.courseId);
                            }
                            handleCloseMenu();
                          }}
                          sx={{
                            width: "120px",
                            height: "auto",
                            color: "black",
                            position: "absolute",
                            cursor: "pointer",
                            bgcolor: "white",
                            paddingX: "12px",
                            paddingY: "6px",
                            borderRadius: "10px 10px 0px 0px",
                            fontWeight: "500",
                            textAlign: "center",
                            "&:hover": {
                              opacity: 0.8,
                            },
                          }}
                        >
                          View Detail
                        </Typography>
                        <Typography
                          onClick={(event) => {
                            event.stopPropagation();
                            if (
                              course &&
                              course.courseId !== null &&
                              course.courseId !== undefined &&
                              handleEditCourse
                            ) {
                              handleEditCourse(course.courseId);
                            }
                          }}
                          sx={{
                            width: "120px",
                            height: "auto",
                            color: "black",
                            position: "absolute",
                            cursor: "pointer",
                            bgcolor: "white",
                            paddingX: "12px",
                            paddingY: "6px",
                            borderRadius: "0px 0px 0px 0px",
                            fontWeight: "500",
                            marginTop: "35px",
                            textAlign: "center",
                            "&:hover": {
                              opacity: 0.8,
                            },
                          }}
                        >
                          Edit
                        </Typography>
                        <Typography
                          onClick={(event) => {
                            event.stopPropagation();
                            setIsDeleteDialogOpen(true);
                          }}
                          sx={{
                            width: "120px",
                            height: "auto",
                            color: "black",
                            position: "absolute",
                            cursor: "pointer",
                            bgcolor: "white",
                            paddingX: "12px",
                            paddingY: "6px",
                            borderRadius: "0px 0px 10px 10px",
                            fontWeight: "500",
                            marginTop: "70px",
                            textAlign: "center",
                            "&:hover": {
                              opacity: 0.8,
                            },
                          }}
                        >
                          Delete
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                </Box>
              )}

              {isTrainerManage === true && isDeleteMode === true && (
                <Box
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  sx={{
                    position: "absolute",
                    cursor: "pointer",
                    right: 5,
                    top: 10,
                  }}
                >
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "24px",
                      },
                      color: secondaryLightColor,
                    }}
                    checked={selectedDeleteCourses?.includes(
                      course.courseId as string
                    )}
                    onChange={(event) =>
                      handleCheckboxChange(event, course.courseId as string)
                    }
                  ></Checkbox>
                </Box>
              )}

              <Dialog
                open={isDeleteDialogOpen}
                onClose={handleClose}
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
                    Are you sure to delete your course?
                  </Typography>
                  <Box sx={{ display: "flex", gap: "15px" }}>
                    <Typography
                      onClick={async (event) => {
                        event.stopPropagation();
                        if (
                          course &&
                          course.courseId !== null &&
                          course.courseId !== undefined
                        ) {
                          await deleteCoursesFetcher(
                            [course.courseId],
                            DELETE_COURSE,
                            auth.token === null ? null : auth.token
                          );
                          if (mutateListCourses) {
                            mutateListCourses();
                          }
                          enqueueSnackbar("Delete course complete", {
                            variant: "success",
                          });
                        }
                        handleCloseMenu();
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
                    <Typography
                      onClick={(event) => {
                        event.stopPropagation();
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

              <Box sx={{ width: "100%", height: "80%" }}>
                {course.courseImage === null ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "3px solid " + secondaryLightColor,
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px 20px 0px 0px",
                      bgcolor: primaryDarkColor,
                    }}
                  >
                    <ImageNotSupportedIcon
                      sx={{ color: secondaryLightColor, fontSize: "128px" }}
                    ></ImageNotSupportedIcon>
                  </Box>
                ) : (
                  <Box sx={{ width: "100%", height: "100%" }}>
                    <img
                      src={
                        typeof course.courseImage === "string" &&
                        course.courseImage !== null
                          ? course.courseImage
                          : undefined
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        borderRadius: "20px 20px 0px 0px",
                      }}
                    ></img>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "20%",
                  bgcolor: secondaryLightColor,
                  borderRadius: "0px 0px 20px 20px",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                    fontSize: "24px",
                    fontWeight: "800",
                    height: "60%",
                  }}
                >
                  {course.trainingPeriod}
                </Typography>

                <Divider
                  sx={{
                    bgcolor: primaryDarkColor,
                    width: "100%",
                    height: "1px",
                  }}
                ></Divider>

                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    width: "100%",
                    justifyContent: "center",
                    height: "40%",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      fontSize: BreakPointBelow_sm ? "0.7rem" : "14px",
                      fontWeight: "700",
                    }}
                  >
                    {course.numDaysPerWeek} / Week
                  </Typography>

                  <Divider
                    orientation="vertical"
                    sx={{
                      bgcolor: primaryDarkColor,
                      width: "1px",
                      height: "100%",
                    }}
                  ></Divider>

                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      fontSize: BreakPointBelow_sm ? "0.7rem" : "14px",
                      fontWeight: "700",
                    }}
                  >
                    {course.trainingTime} / Day
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box>
          {" "}
          <Typography
            sx={{
              color: secondaryLightColor + "33",
              fontWeight: "500",
              fontSize: BreakPointBelow_sm ? "24px" : "40px",
              userSelect: "none",
              msUserSelect: "none",
              WebkitUserSelect: "none",
              textAlign: "center",
            }}
          >
            Course not found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
