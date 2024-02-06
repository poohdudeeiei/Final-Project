import {
  Box,
  Dialog,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseType from "@/models/pages/course_management/CourseType";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import PersonIcon from "@mui/icons-material/Person";
import { tr } from "date-fns/locale";

interface CardDialogProps {
  isTrainerManage: boolean;
  isCardDialogOpen: boolean;
  handleClickCardDialogClose: () => void;
  courseToShow: CourseType;
}

export default function CardDialog({
  isCardDialogOpen,
  handleClickCardDialogClose,
  courseToShow,
  isTrainerManage,
}: CardDialogProps) {
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

  const [totalDays, setTotalDays] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);

  useEffect(() => {
    if (courseToShow) {
      const trainingPeriodParts: string[] =
        courseToShow.trainingPeriod?.match(/(\d+) (\w+)/) || [];

      const numDaysPerWeekParts: string[] =
        courseToShow.numDaysPerWeek?.match(/(\d+) (\w+)/) || [];

      const trainingTimeParts: string[] =
        courseToShow.trainingTime?.match(/(\d+) (\w+)(?: (\d+) (\w+))?/) || [];

      const trainingPeriodValue: number =
        parseInt(trainingPeriodParts[1], 10) || 0;

      const numDaysPerWeekValue: number =
        parseInt(numDaysPerWeekParts[1], 10) || 0;

      const trainingTimeFirstValue: number =
        parseInt(trainingTimeParts[1], 10) || 0;
      const trainingTimeSecondValue: number =
        parseInt(trainingTimeParts[3], 10) || 0;
      const trainingTimeFirstUnit: string = trainingTimeParts[2] || "";
      const trainingTimeSecondUnit: string = trainingTimeParts[4] || "";

      if (
        trainingTimeFirstUnit === "Hour" ||
        trainingTimeFirstUnit === "Hours"
      ) {
        setTotalHours(
          trainingTimeFirstValue * (trainingPeriodValue * numDaysPerWeekValue)
        );
        setTotalMinutes(0);
      }

      if (
        trainingTimeFirstUnit === "Minute" ||
        trainingTimeFirstUnit === "Minutes"
      ) {
        setTotalHours(
          Math.floor(
            (trainingTimeFirstValue *
              (trainingPeriodValue * numDaysPerWeekValue)) /
              60
          )
        );
        setTotalMinutes(
          (trainingTimeFirstValue *
            (trainingPeriodValue * numDaysPerWeekValue)) %
            60
        );
      }

      if (
        (trainingTimeFirstUnit === "Hour" ||
          trainingTimeFirstUnit === "Hours") &&
        (trainingTimeSecondUnit === "Minute" ||
          trainingTimeSecondUnit === "Minutes")
      ) {
        const convertMinutesToHours = Math.floor(
          (trainingTimeSecondValue *
            (trainingPeriodValue * numDaysPerWeekValue)) /
            60
        );

        const totalHours = Math.floor(
          trainingTimeFirstValue * (trainingPeriodValue * numDaysPerWeekValue) +
            convertMinutesToHours
        );

        setTotalHours(totalHours);
        setTotalMinutes(
          (trainingTimeSecondValue *
            (trainingPeriodValue * numDaysPerWeekValue)) %
            60
        );
      }

      setTotalDays(trainingPeriodValue * numDaysPerWeekValue);
    }
  }, [courseToShow]);

  return (
    <Dialog
      open={isCardDialogOpen}
      onClose={handleClickCardDialogClose}
      maxWidth="xl"
      fullScreen={BreakPointBelow_md ? true : false}
      PaperProps={{
        sx: {
          bgcolor: secondaryDarkColor,
          width: "800px",
          borderRadius: "10px",
          overflowY: "scroll",
          overflowX: "hidden",
          paddingTop: "20px",
          paddingX: BreakPointBelow_md ? "0px" : "40px",
          ...(BreakPointBelow_md && {
            maxHeight: "100vh",
          }),
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {isTrainerManage === true ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                color: "white",
                // flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: primaryDarkColor + "99",
                paddingY: "10px",
                paddingX: "20px",
                borderRadius: "15px",
              }}
            >
              <PersonIcon
                sx={{
                  fontSize: BreakPointBelow_md ? "52px" : "82px",
                  marginRight: "20px",
                }}
              ></PersonIcon>
              <Typography
                sx={{
                  fontSize: BreakPointBelow_md ? "24px" : "44px",
                  fontWeight: "600",
                  color:
                    courseToShow?.isAvailable === true ? "#00A86B" : "#F03A47",
                }}
              >
                {courseToShow?.numberOfEnroll}{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: BreakPointBelow_md ? "20px" : "44px",
                  marginX: "20px",
                  fontWeight: "600",
                }}
              >
                /
              </Typography>
              <Typography
                sx={{
                  fontSize: BreakPointBelow_md ? "24px" : "44px",
                  fontWeight: "600",
                }}
              >
                {courseToShow?.receiving}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography
            sx={{
              color: "white",
              fontSize: BreakPointBelow_sm ? "7vw" : "32px",
              fontWeight: "700",
              width: "fit-content",
              maxWidth: "90%",
              wordWrap: "break-word",
              textAlign: "center",
              bgcolor: primaryDarkColor + "99",
              paddingX: "20px",
              paddingY: "5px",
              borderRadius: "15px",
            }}
          >
            {courseToShow?.courseName}
          </Typography>
        )}

        {courseToShow &&
        typeof courseToShow.courseImage === "string" &&
        courseToShow !== null ? (
          <Box
            sx={{
              width: "90%",
              height: BreakPointBelow_sm
                ? "180px"
                : BreakPointBelow_md
                ? "260px"
                : "340px",
              border: "2px solid " + secondaryLightColor,
              borderRadius: "20px",
              marginBottom: "10px",
              backgroundImage:
                courseToShow &&
                typeof courseToShow.courseImage === "string" &&
                courseToShow.courseImage !== null
                  ? `url(${courseToShow.courseImage})`
                  : null,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid " + secondaryLightColor,
              width: "90%",
              height: BreakPointBelow_sm
                ? "180px"
                : BreakPointBelow_md
                ? "260px"
                : "340px",
              borderRadius: "20px",
              bgcolor: primaryDarkColor,
            }}
          >
            <ImageNotSupportedIcon
              sx={{ color: secondaryLightColor, fontSize: "128px" }}
            ></ImageNotSupportedIcon>
          </Box>
        )}

        <Box
          sx={{
            width: "95%",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            bgcolor: primaryDarkColor + "99",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: BreakPointBelow_sm ? "" : "flex",
              color: "white",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: BreakPointBelow_md ? "110px" : "140px",
              }}
            >
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "700",
                  fontSize: BreakPointBelow_md ? "14px" : "18px",
                  color: primaryMainColor,
                }}
              >
                Course Name :
              </Typography>
            </Box>
            <Box
              sx={{
                width: "70%",
                ...(BreakPointBelow_sm && {
                  marginLeft: "25px",
                }),
                alignSelf: "flex-end",
              }}
            >
              <Typography
                sx={{
                  wordWrap: "break-word",
                  fontWeight: "400",
                  fontSize: BreakPointBelow_md ? "12px" : "16px",
                }}
              >
                {courseToShow?.courseName}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: BreakPointBelow_sm ? "" : "flex",
              color: "white",
              gap: "20px",
              alignItems: "flex-end",
            }}
          >
            <Typography
              sx={{
                wordWrap: "break-word",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: BreakPointBelow_md ? "14px" : "18px",
                color: primaryMainColor,
              }}
            >
              Course Status :{" "}
            </Typography>
            <Typography
              sx={{
                wordWrap: "break-word",
                fontWeight: "400",
                fontSize: BreakPointBelow_md ? "12px" : "16px",
                ...(BreakPointBelow_sm && {
                  marginLeft: "25px",
                }),
              }}
            >
              {courseToShow?.isAvailable === true ? "Available" : "Full"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: BreakPointBelow_sm ? "" : "flex",
              color: "white",
              gap: "20px",
              alignItems: "flex-end",
            }}
          >
            <Typography
              sx={{
                wordWrap: "break-word",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: BreakPointBelow_md ? "14px" : "18px",
                color: primaryMainColor,
              }}
            >
              Training Period :{" "}
            </Typography>
            <Typography
              sx={{
                wordWrap: "break-word",
                fontWeight: "400",
                fontSize: BreakPointBelow_md ? "12px" : "16px",
                ...(BreakPointBelow_sm && {
                  marginLeft: "25px",
                }),
              }}
            >
              {courseToShow?.trainingPeriod}
            </Typography>
          </Box>

          <Box
            sx={{
              display: BreakPointBelow_sm ? "" : "flex",
              color: "white",
              gap: "20px",
              alignItems: "flex-end",
            }}
          >
            <Typography
              sx={{
                wordWrap: "break-word",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: BreakPointBelow_md ? "14px" : "18px",
                color: primaryMainColor,
              }}
            >
              Number of Days Per Week :{" "}
            </Typography>
            <Typography
              sx={{
                wordWrap: "break-word",
                fontWeight: "400",
                fontSize: BreakPointBelow_md ? "12px" : "16px",
                ...(BreakPointBelow_sm && {
                  marginLeft: "25px",
                }),
              }}
            >
              {courseToShow?.numDaysPerWeek} (
              {totalDays === 1 ? totalDays + " Day" : totalDays + " Days"})
            </Typography>
          </Box>

          <Box
            sx={{
              display: BreakPointBelow_sm ? "" : "flex",
              color: "white",
              gap: "20px",
              alignItems: "flex-end",
            }}
          >
            <Typography
              sx={{
                wordWrap: "break-word",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: BreakPointBelow_md ? "14px" : "18px",
                color: primaryMainColor,
              }}
            >
              Training Time :{" "}
            </Typography>
            <Typography
              sx={{
                wordWrap: "break-word",
                fontWeight: "400",
                fontSize: BreakPointBelow_md ? "12px" : "16px",
                ...(BreakPointBelow_sm && {
                  marginLeft: "25px",
                }),
              }}
            >
              {courseToShow?.trainingTime} (
              {`${
                totalHours !== 0
                  ? `${totalHours} ${totalHours === 1 ? "Hour" : "Hours"}`
                  : ""
              } ${
                totalMinutes !== 0
                  ? `${totalMinutes} ${
                      totalMinutes === 1 ? "Minute" : "Minutes"
                    }`
                  : ""
              }`.trim()}
              )
            </Typography>
          </Box>

          <Box
            sx={{
              color: "white",
            }}
          >
            <Typography
              sx={{
                wordWrap: "break-word",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: BreakPointBelow_md ? "14px" : "18px",
                color: primaryMainColor,
              }}
            >
              Purpose :{" "}
            </Typography>

            {courseToShow?.purpose &&
              courseToShow.purpose.map((purpose, index) => (
                <Typography
                  key={index}
                  sx={{
                    wordWrap: "break-word",
                    fontWeight: "400",
                    fontSize: BreakPointBelow_md ? "12px" : "16px",
                    marginLeft: BreakPointBelow_sm ? "25px" : "50px",
                    marginTop: "10px",
                  }}
                >
                  -&nbsp; {purpose}
                </Typography>
              ))}
          </Box>
          <Box
            sx={{
              color: "white",
            }}
          >
            <Typography
              sx={{
                wordWrap: "break-word",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: BreakPointBelow_md ? "14px" : "18px",
                color: primaryMainColor,
              }}
            >
              Description :{" "}
            </Typography>
            <Typography
              sx={{
                wordWrap: "break-word",
                fontWeight: "400",
                fontSize: BreakPointBelow_md ? "12px" : "16px",
                marginLeft: BreakPointBelow_sm ? "25px" : "50px",
              }}
            >
              {courseToShow?.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginY: "20px",
        }}
      >
        {isTrainerManage === false && (
          <Typography
            onClick={() => {}}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingX: "12px",
              paddingY: "6px",
              bgcolor: "#00A86B",
              borderRadius: "10px",
              transition: "0.5s",
              color: "white",
              fontWeight: "500",
              fontSize: "14px",
              "&:hover": {
                bgcolor: primaryDarkColor,
                color: "#00A86B",
              },
              userSelect: "none",
              msUserSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            Enroll
          </Typography>
        )}

        <Typography
          onClick={handleClickCardDialogClose}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingX: "12px",
            paddingY: "6px",
            bgcolor: "#F03A47",
            borderRadius: "10px",
            transition: "0.5s",
            color: "white",
            fontWeight: "500",
            fontSize: "14px",
            "&:hover": {
              bgcolor: primaryDarkColor,
              color: "#F03A47",
            },
            userSelect: "none",
            msUserSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          Cancel
        </Typography>
      </Box>
    </Dialog>
  );
}
