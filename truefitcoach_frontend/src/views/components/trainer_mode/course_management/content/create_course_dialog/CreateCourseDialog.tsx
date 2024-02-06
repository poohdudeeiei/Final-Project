import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, styled, useTheme } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import {
  Checkbox,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Input } from "@mui/base/Input";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CourseType from "@/models/pages/course_management/CourseType";
import ImageShow from "./ImageShow";
import useSWR, { MutatorCallback } from "swr";
import { GET_TRAINING_TYPES } from "@/services/endpoint/global";
import { fetchTypes } from "@/services/api/fetcher";
import { useAuth } from "@/้hooks/useAuth";
import {
  CREATE_COURSE,
  EDIT_COURSE,
} from "@/services/endpoint/courseManagement";
import {
  createCourseFetcher,
  editCoursesFetcher,
} from "@/services/api/courseManagementAPI/courseManagementAPI";
import { useSnackbar } from "notistack";

interface CreateCourseDialogProps {
  isDialogOpen: boolean;
  handleClickDialogClose: () => void;
  courseToEdit?: CourseType;
  mutateListCourses: (
    data?:
      | CourseType[]
      | Promise<CourseType[]>
      | MutatorCallback<CourseType[]>
      | undefined,
    shouldRevalidate?: boolean | undefined
  ) => Promise<any>;
  handleEditCourse: (courseId: string) => void;
  isEditedMode: boolean;
}

interface TrainingType {
  purpose: { trainingTypeName: string }[];
}

export default function CreateCourseDialog({
  isDialogOpen,
  handleClickDialogClose,
  courseToEdit,
  handleEditCourse,
  isEditedMode,
  mutateListCourses,
}: CreateCourseDialogProps) {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [courseId, setCourseId] = useState<string | null>(null);
  const [courseName, setCourseName] = useState<string | null>(null);
  const [trainingPeriod, setTrainingPeriod] = useState<number | null>(null);
  const [numDaysPerWeek, setNumDaysPerWeek] = useState<number | null>(null);
  const [trainingHours, setTrainingHours] = useState<number | null>(null);
  const [trainingMinutes, setTrainingMinutes] = useState<number | null>(null);
  const [purpose, setPurpose] = useState<string[] | null>(null);
  const [description, setDescription] = useState<string>("");
  const [receiving, setReceiving] = useState<number | null>(null);

  const [courseImage, setCourseImage] = useState<File | string | null>(null);
  const [courseImageToFetch, setCourseImageToFetch] = useState<
    File | string | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isFocusCourseName, setIsFocusCourseName] = useState<boolean>(false);
  const [isFocusTrainingPeriod, setIsFocusTrainingPeriod] =
    useState<boolean>(false);
  const [isFocusTrainingHours, setIsFocusTrainingHours] =
    useState<boolean>(false);
  const [isFocusTrainingMinutes, setIsFocusTrainingMinutes] =
    useState<boolean>(false);
  const [isFocusReceiving, setIsFocusReceiving] = useState<boolean>(false);
  const [isFocusDescription, setIsFocusDescription] = useState<boolean>(false);

  const [isFormPass, setIsFormPass] = useState<boolean>(false);
  const [isSubmitPass, setIsSubmitPass] = useState<boolean>(true);

  const { data: trainingType, error: fetchError } = useSWR<TrainingType>(
    GET_TRAINING_TYPES,
    fetchTypes
  );

  const handleChangeNumDaysPerWeek = (event: SelectChangeEvent) => {
    const selectedValue = parseInt(event.target.value, 10);
    setNumDaysPerWeek(selectedValue);
  };

  const handleFocus = (focusOn: string) => {
    setIsFocusCourseName(focusOn === "CourseName");
    setIsFocusTrainingPeriod(focusOn === "trainingPeriod");
    setIsFocusTrainingHours(focusOn === "trainingHours");
    setIsFocusTrainingMinutes(focusOn === "trainingMinutes");
    setIsFocusReceiving(focusOn === "Receiving");
    setIsFocusDescription(focusOn === "Description");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setCourseImage(file);
  };

  const handleClickImageBox = () => {
    fileInputRef.current?.click();
  };

  const handleCheckBoxPurpose = (selectedPurpose: string) => {
    setPurpose((prevPurpose) => {
      if (prevPurpose?.includes(selectedPurpose)) {
        return prevPurpose.filter((purpose) => purpose !== selectedPurpose);
      } else {
        return [...(prevPurpose || []), selectedPurpose];
      }
    });
  };

  const handleCreateCourse = async () => {
    formCheck();
    if (isFormPass && isEditedMode === false) {
      setIsSubmitPass(true);
      const newCourse: CourseType = {
        courseId: null,
        courseImage: courseImage,
        courseName: courseName,
        trainingPeriod:
          trainingPeriod !== null
            ? `${trainingPeriod.toString()} ${
                trainingPeriod === 1 ? "Week" : "Weeks"
              }`
            : null,
        numDaysPerWeek:
          numDaysPerWeek !== null
            ? `${numDaysPerWeek.toString()} ${
                numDaysPerWeek === 1 ? "Day" : "Days"
              }`
            : null,
        trainingTime:
          trainingHours !== null && trainingMinutes !== null
            ? `${
                trainingHours !== 0
                  ? `${trainingHours} ${trainingHours === 1 ? "Hour" : "Hours"}`
                  : ""
              } ${
                trainingMinutes !== 0
                  ? `${trainingMinutes} ${
                      trainingMinutes === 1 ? "Minute" : "Minutes"
                    }`
                  : ""
              }`.trim()
            : null,
        purpose: purpose,
        description: description,
        receiving: receiving,
      };

      if (newCourse) {
        await createCourseFetcher(
          newCourse,
          CREATE_COURSE,
          auth.token === null ? null : auth.token
        );
        mutateListCourses();
        enqueueSnackbar("Create course complete", {
          variant: "success",
        });
      }
      handleClickDialogClose();
    } else if (isFormPass && courseToEdit && isEditedMode === true) {
      setIsSubmitPass(true);
      const editCourse: CourseType = {
        courseId: courseId,
        courseImage:
          courseImageToFetch !== null && typeof courseImage === "string"
            ? courseImageToFetch
            : courseImage,
        courseName: courseName,
        trainingPeriod:
          trainingPeriod !== null
            ? `${trainingPeriod.toString()} ${
                trainingPeriod === 1 ? "Week" : "Weeks"
              }`
            : null,
        numDaysPerWeek:
          numDaysPerWeek !== null
            ? `${numDaysPerWeek.toString()} ${
                numDaysPerWeek === 1 ? "Day" : "Days"
              }`
            : null,
        trainingTime:
          trainingHours !== null && trainingMinutes !== null
            ? `${
                trainingHours !== 0
                  ? `${trainingHours} ${trainingHours === 1 ? "Hour" : "Hours"}`
                  : ""
              } ${
                trainingMinutes !== 0
                  ? `${trainingMinutes} ${
                      trainingMinutes === 1 ? "Minute" : "Minutes"
                    }`
                  : ""
              }`.trim()
            : null,
        purpose: purpose,
        description: description,
        receiving: receiving,
      };

      if (editCourse) {
        await editCoursesFetcher(
          editCourse,
          EDIT_COURSE,
          auth.token === null ? null : auth.token
        );
        mutateListCourses();
        enqueueSnackbar("Edit course complete", {
          variant: "success",
        });
      }
      handleClickDialogClose();
    } else {
      setIsSubmitPass(false);
    }
  };

  const formCheck = () => {
    const isCourseNamePass =
      courseName !== "" && courseName !== null ? true : false;
    const isTrainingPeriodPass =
      trainingPeriod !== null && trainingPeriod > 0 ? true : false;
    const isTrainingHoursPass =
      trainingHours !== null && trainingHours > 0
        ? true
        : trainingHours !== null &&
          trainingHours === 0 &&
          trainingMinutes !== null &&
          trainingMinutes > 0
        ? true
        : false;
    const isTrainingMinutesPass =
      trainingMinutes !== null && trainingMinutes > 0
        ? true
        : trainingMinutes !== null &&
          trainingMinutes === 0 &&
          trainingHours !== null &&
          trainingHours > 0
        ? true
        : false;
    const isPurposePass =
      purpose?.length !== 0 && purpose !== null ? true : false;
    const isDescriptionPass = description !== null ? true : false;
    const isReceivingPass =
      receiving !== null && receiving > 0 && isEditedMode === false
        ? true
        : courseToEdit &&
          isEditedMode === true &&
          receiving !== null &&
          courseToEdit?.numberOfEnroll !== null &&
          courseToEdit?.numberOfEnroll !== undefined &&
          courseToEdit?.numberOfEnroll <= receiving
        ? true
        : false;

    if (
      isCourseNamePass &&
      isTrainingPeriodPass &&
      isTrainingHoursPass &&
      isTrainingMinutesPass &&
      isPurposePass &&
      isDescriptionPass &&
      isReceivingPass
    ) {
      setIsFormPass(true);
    } else {
      setIsFormPass(false);
    }
  };

  useEffect(() => {
    formCheck();
  }, [
    courseImage,
    courseName,
    trainingHours,
    trainingMinutes,
    trainingPeriod,
    purpose,
    description,
    receiving,
  ]);

  useEffect(() => {
    if (isDialogOpen === true && isEditedMode === false) {
      setCourseImage(null);
      setCourseName(null);
      setTrainingPeriod(null);
      setNumDaysPerWeek(null);
      setTrainingHours(null);
      setTrainingMinutes(null);
      setPurpose(null);
      setDescription("");
      setIsSubmitPass(true);
      setCourseImage(null);
      setReceiving(null);
      setIsFormPass(false);
    }
  }, [isDialogOpen, courseToEdit, handleEditCourse]);

  useEffect(() => {
    if (isDialogOpen === true && isFormPass === true) {
      setIsSubmitPass(true);
    }
  }, [formCheck]);

  useEffect(() => {
    formCheck();

    if (courseToEdit && isEditedMode === true) {
      const imageUrl = courseToEdit.courseImage;
      const splitValue = "http://localhost:8080/";
      const splitResult =
        imageUrl && typeof imageUrl === "string"
          ? imageUrl.split(splitValue)
          : null;
      if (splitResult !== null && splitResult.length > 1) {
        const newPath = splitResult[1];
        setCourseImageToFetch(newPath);
      } else {
        setCourseImageToFetch(imageUrl);
      }
      setCourseImage(courseToEdit.courseImage);
      setCourseId(
        courseToEdit.courseId ? (courseToEdit.courseId as string) : null
      );
      const trainingPeriod: string = courseToEdit.trainingPeriod ?? "";
      const numDaysPerWeek: string = courseToEdit.numDaysPerWeek ?? "";
      const trainingTime: string = courseToEdit.trainingTime ?? "";

      const trainingPeriodParts: string[] =
        trainingPeriod.match(/(\d+) (\w+)/) || [];

      const numDaysPerWeekParts: string[] =
        numDaysPerWeek.match(/(\d+) (\w+)/) || [];

      const trainingTimeParts: string[] =
        trainingTime.match(/(\d+) (\w+)(?: (\d+) (\w+))?/) || [];

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

      setCourseName(courseToEdit?.courseName);
      setTrainingPeriod(trainingPeriodValue);
      setNumDaysPerWeek(numDaysPerWeekValue);
      setTrainingHours(null);
      setTrainingMinutes(null);
      if (
        trainingTimeFirstUnit === "Hour" ||
        trainingTimeFirstUnit === "Hours"
      ) {
        setTrainingHours(trainingTimeFirstValue);
        setTrainingMinutes(0);
      }

      if (
        trainingTimeFirstUnit === "Minute" ||
        trainingTimeFirstUnit === "Minutes"
      ) {
        setTrainingHours(0);
        setTrainingMinutes(trainingTimeFirstValue);
      }

      if (
        (trainingTimeFirstUnit === "Hour" ||
          trainingTimeFirstUnit === "Hours") &&
        (trainingTimeSecondUnit === "Minute" ||
          trainingTimeSecondUnit === "Minutes")
      ) {
        setTrainingHours(trainingTimeFirstValue);
        setTrainingMinutes(trainingTimeSecondValue);
      }

      setPurpose(courseToEdit?.purpose);
      setDescription(courseToEdit.description);
      setReceiving(courseToEdit?.receiving);
    }
  }, [courseToEdit, handleEditCourse]);

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

  const [isHoverInputImage, setIsHoverInputImage] = useState(false);

  const FormInput = styled(Input)(
    ({}) => `
      .MuiInput-input {
        width: 100%;
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: white;
        background: ${secondaryDarkColor};
        border: 1px solid ${secondaryLightColor};
        resize: none;

        &:hover {
          border-color: ${secondaryMainColor};
        }

        &:focus {
          outline: 0;
          border: 1px solid ${primaryMainColor};
        }

        &::placeholder {
          font-size: ${BreakPointBelow_md ? "10px" : "0.8rem"};
          font-family: 'system-ui';
          color: "grey";
        }
      }
    `
  );

  const NumberInput = styled("input")(
    ({}) => `
        width: 100%;
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: white;
        background: ${secondaryDarkColor};
        border: 1px solid ${secondaryLightColor};
        resize: none;
  
        &:hover {
          border-color: ${secondaryMainColor};
        }
  
        &:focus {
          outline: 0;
          border: 1px solid ${primaryMainColor}
        }

        &::placeholder {
          font-size: ${BreakPointBelow_md ? "10px" : "0.8rem"};
          font-family: 'system-ui';
          color: "grey";
        }
      }
  `
  );

  const Label = styled(Typography)(
    () => `    font-size: 0.875rem;
  margin-bottom: 4px;
  color: white;
  text-transform: uppercase;
  font-weight: 500;`
  );

  const HelperText = ({
    helperText,
    error,
  }: {
    helperText: string;
    error?: boolean;
  }) => {
    return error ? (
      <Typography
        sx={{
          fontSize: BreakPointBelow_md ? "0.6rem" : "0.72rem",
          color: "#f03a47",
          position: "absolute",
        }}
      >
        {helperText}
      </Typography>
    ) : null;
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClickDialogClose}
      maxWidth="xl"
      fullScreen={BreakPointBelow_md ? true : false}
      PaperProps={{
        sx: {
          bgcolor: secondaryDarkColor,
          width: "750px",
          maxHeight: "90vh",
          borderRadius: "10px",
          overflow: "auto",
          ...(BreakPointBelow_md && {
            height: "100%",
            maxHeight: "100vh",
          }),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingY: "20px",
          flexDirection: "column",
          width: "100%",
          height: "auto",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "700",
            marginBottom: "20px",
            fontSize: BreakPointBelow_sm ? "8vw" : "32px",
            textTransform: "uppercase",
            bgcolor: primaryDarkColor + "99",
            paddingX: "20px",
            paddingY: "5px",
            borderRadius: "15px",
          }}
        >
          Create course
        </Typography>

        <Box
          onClick={handleClickImageBox}
          onMouseEnter={() => {
            setIsHoverInputImage(true);
            handleFocus("none");
          }}
          onMouseLeave={() => setIsHoverInputImage(false)}
          sx={{
            cursor: "pointer",
            width: "90%",
            height: BreakPointBelow_sm
              ? "180px"
              : BreakPointBelow_md
              ? "260px"
              : "340px",
            bgcolor: primaryDarkColor,
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginBottom: "20px",
            border: "1px solid " + primaryLightColor,
          }}
        >
          <Box
            sx={{
              borderRadius: "20px",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "filter 0.5s, background-color 0.5s",
              "&:hover": {
                filter: isHoverInputImage ? "blur(2px)" : "none",
                opacity: 0.5,
              },
            }}
          >
            <ImageShow
              courseImage={courseImage ? courseImage : null}
            ></ImageShow>
            {courseImage === null && (
              <Typography
                sx={{
                  color: "gray",
                  fontSize: BreakPointBelow_md ? "12px" : "14px",
                  textTransform: "uppercase",
                  fontWeight: "500",
                  userSelect: "none",
                  msUserSelect: "none",
                  WebkitUserSelect: "none",
                  position: "absolute",
                }}
              >
                Input your image here
              </Typography>
            )}
          </Box>
          {isHoverInputImage && (
            <Box sx={{ position: "absolute", pointerEvents: "none" }}>
              <AddCircleIcon
                sx={{
                  color: secondaryLightColor,
                  fontSize: BreakPointBelow_md ? "100px" : "162px",
                }}
              ></AddCircleIcon>
            </Box>
          )}{" "}
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={fileInputRef}
          ></input>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignSelf: "flex-start",
            justifySelf: "center",
            flexDirection: "column",
            marginX: BreakPointBelow_md ? "2.5%" : "7.5%",
            width: BreakPointBelow_md ? "95%" : "85%",
            height: "fit-content",
            gap: "25px",
            bgcolor: primaryDarkColor + "99",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Box sx={{ width: "100%", height: "auto" }}>
            <Label
              sx={{
                ...(BreakPointBelow_md && {
                  fontSize: "12px",
                }),
              }}
            >
              Course name *
            </Label>
            <FormInput
              placeholder="Input your course name here"
              value={courseName === null ? "" : courseName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCourseName(e.target.value);
              }}
              onClick={() => handleFocus("CourseName")}
              autoFocus={isFocusCourseName}
            />
            {!isSubmitPass && (
              <HelperText
                helperText="Course name is required."
                error={courseName === "" || courseName === null ? true : false}
              ></HelperText>
            )}
          </Box>

          <Grid
            container
            sx={{
              width: "100%",
              height: "auto",
              ...(BreakPointBelow_md && {
                gap: "25px",
              }),
            }}
          >
            <Grid item xs={BreakPointBelow_md ? 12 : 5.9}>
              <Label
                sx={{
                  ...(BreakPointBelow_md && {
                    fontSize: "12px",
                  }),
                }}
              >
                Training period * (Weeks)
              </Label>
              <Box
                sx={{
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "100%",
                }}
              >
                <NumberInput
                  placeholder="Input weeks here"
                  type="number"
                  min={0}
                  autoFocus={isFocusTrainingPeriod}
                  value={trainingPeriod === null ? "" : trainingPeriod}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    const newValue =
                      inputValue === "" ? 0 : parseInt(inputValue);
                    setTrainingPeriod(newValue);
                  }}
                  onClick={() => handleFocus("trainingPeriod")}
                />
              </Box>
              {!isSubmitPass && (
                <HelperText
                  helperText={
                    trainingPeriod !== null && trainingPeriod === 0
                      ? "Weeks value must not be zero."
                      : trainingPeriod !== null && trainingPeriod < 0
                      ? "Please input positive number."
                      : "Training period (weeks) is required."
                  }
                  error={
                    trainingPeriod !== null && trainingPeriod === 0
                      ? true
                      : (trainingPeriod !== null && trainingPeriod < 0) ||
                        trainingPeriod === null
                      ? true
                      : false
                  }
                />
              )}
            </Grid>

            {BreakPointBelow_md === false && <Grid item xs={0.2}></Grid>}

            <Grid item xs={BreakPointBelow_md ? 12 : 5.9}>
              {" "}
              <Label
                sx={{
                  ...(BreakPointBelow_md && {
                    fontSize: "12px",
                  }),
                }}
              >
                Number of days training per week *
              </Label>
              <Select
                id="numDaysPerWeek"
                value={
                  numDaysPerWeek !== null &&
                  numDaysPerWeek <= 7 &&
                  numDaysPerWeek > 0
                    ? numDaysPerWeek.toString()
                    : ""
                }
                inputProps={{ "aria-label": "Without label" }}
                displayEmpty
                onChange={handleChangeNumDaysPerWeek}
                sx={{
                  width: "100%",
                  color: "white",
                  borderColor: "white",
                  bgcolor: secondaryDarkColor,
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: secondaryLightColor,
                    height: "42px",
                    borderRadius: "7px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: secondaryMainColor,
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "white",
                  },
                }}
                style={{ fontSize: "0.875rem" }}
                size="small"
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Typography
                        sx={{
                          color: "grey",
                          fontSize: BreakPointBelow_md ? "10px" : "0.8rem",
                          fontFamily: "system-ui",
                        }}
                      >
                        Input number of days here
                      </Typography>
                    );
                  }
                  return selected.toString();
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
              </Select>
              {!isSubmitPass && (
                <Box sx={{ marginTop: "5px" }}>
                  <HelperText
                    helperText={
                      numDaysPerWeek !== null && numDaysPerWeek === 0
                        ? "Number of days value must not be zero."
                        : "Number of days is required."
                    }
                    error={
                      numDaysPerWeek !== null && numDaysPerWeek === 0
                        ? true
                        : (numDaysPerWeek !== null && numDaysPerWeek < 0) ||
                          numDaysPerWeek === null
                        ? true
                        : false
                    }
                  />
                </Box>
              )}
            </Grid>
          </Grid>

          <Box sx={{ width: "100%" }}>
            {" "}
            <Label
              sx={{
                ...(BreakPointBelow_md && {
                  fontSize: "12px",
                }),
              }}
            >
              Training time per day * (Hours : Minutes)
            </Label>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Box sx={{ width: "50%" }}>
                <NumberInput
                  placeholder="Input hours here"
                  type="number"
                  min={0}
                  max={23}
                  autoFocus={isFocusTrainingHours}
                  value={trainingHours === null ? "" : trainingHours}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    const newValue =
                      inputValue === ""
                        ? 0
                        : parseInt(inputValue) > 23
                        ? 23
                        : parseInt(inputValue);
                    setTrainingHours(newValue);
                  }}
                  onClick={() => handleFocus("trainingHours")}
                />
                {!isSubmitPass && (
                  <HelperText
                    helperText={
                      trainingHours !== null &&
                      trainingHours === 0 &&
                      trainingMinutes === 0
                        ? "Minute must not be same zero."
                        : trainingHours !== null && trainingHours < 0
                        ? "Please input positive number."
                        : "Hours is required."
                    }
                    error={
                      trainingHours !== null &&
                      trainingHours === 0 &&
                      trainingMinutes === 0
                        ? true
                        : (trainingHours !== null && trainingHours < 0) ||
                          trainingHours === null
                        ? true
                        : false
                    }
                  />
                )}
              </Box>
              <Typography
                sx={{
                  color: "white",
                  justifySelf: "center",
                  alignSelf: "center",
                  fontWeight: "500",
                }}
              >
                :
              </Typography>
              <Box sx={{ width: "50%" }}>
                <NumberInput
                  placeholder="Input minutes here"
                  type="number"
                  min={0}
                  max={59}
                  autoFocus={isFocusTrainingMinutes}
                  value={trainingMinutes === null ? "" : trainingMinutes}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    const newValue =
                      inputValue === ""
                        ? 0
                        : parseInt(inputValue) > 59
                        ? 59
                        : parseInt(inputValue);
                    setTrainingMinutes(newValue);
                  }}
                  onClick={() => handleFocus("trainingMinutes")}
                />
                {!isSubmitPass && (
                  <HelperText
                    helperText={
                      trainingMinutes !== null &&
                      trainingMinutes === 0 &&
                      trainingHours === 0
                        ? "Hour must not be same zero."
                        : trainingMinutes !== null && trainingMinutes < 0
                        ? "Please input positive number."
                        : "Minutes is required."
                    }
                    error={
                      trainingMinutes !== null &&
                      trainingMinutes === 0 &&
                      trainingHours === 0
                        ? true
                        : (trainingMinutes !== null && trainingMinutes < 0) ||
                          trainingMinutes === null
                        ? true
                        : false
                    }
                  />
                )}
              </Box>
            </Box>
          </Box>

          <Grid container>
            {" "}
            <Grid item xs={5.9}>
              {" "}
              <Label
                sx={{
                  ...(BreakPointBelow_md && {
                    fontSize: "12px",
                  }),
                }}
              >
                Number of people receiving *
              </Label>
              <Box
                sx={{
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "100%",
                }}
              >
                <NumberInput
                  placeholder="Input number of people here"
                  type="number"
                  min={0}
                  autoFocus={isFocusReceiving}
                  value={receiving === null ? "" : receiving}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    const newValue =
                      inputValue === "" ? 0 : parseInt(inputValue);
                    setReceiving(newValue);
                  }}
                  onClick={() => handleFocus("Receiving")}
                />
              </Box>
              {!isSubmitPass && (
                <HelperText
                  helperText={
                    // receiving !== null && receiving === 0
                    //   ? "Number of people value must not be zero."
                    //   : (receiving !== null && receiving < 0) ||
                    //     receiving === null
                    //   ? "Please input positive number."
                    //   : receiving !== null &&
                    //     courseToEdit &&
                    //     courseToEdit?.numberOfEnroll !== null &&
                    //     courseToEdit?.numberOfEnroll !== undefined &&
                    //     courseToEdit?.numberOfEnroll > receiving
                    //   ? "Number of people enrolled course must not be lower receiver."
                    //   : "Number of people is required."
                    receiving === null &&
                    isEditedMode === false &&
                    courseToEdit !== null
                      ? "Number of people is required."
                      : receiving !== null &&
                        receiving === 0 &&
                        isEditedMode === false &&
                        courseToEdit !== null
                      ? "Number of people value must not be zero."
                      : receiving !== null &&
                        receiving < 0 &&
                        isEditedMode === false &&
                        courseToEdit !== null
                      ? "Please input a positive number."
                      : courseToEdit &&
                        isEditedMode === true &&
                        courseToEdit !== null &&
                        receiving !== null &&
                        courseToEdit.numberOfEnroll !== null &&
                        courseToEdit.numberOfEnroll !== undefined &&
                        courseToEdit.numberOfEnroll > receiving
                      ? "Number of people enrolled in the course must not be lower than the receiver."
                      : ""
                  }
                  error={
                    receiving === null &&
                    isEditedMode === false &&
                    courseToEdit !== null
                      ? true
                      : receiving !== null &&
                        receiving === 0 &&
                        isEditedMode === false &&
                        courseToEdit !== null
                      ? true
                      : receiving !== null &&
                        receiving < 0 &&
                        isEditedMode === false &&
                        courseToEdit !== null
                      ? true
                      : courseToEdit &&
                        courseToEdit !== null &&
                        isEditedMode === true &&
                        receiving !== null &&
                        courseToEdit.numberOfEnroll !== null &&
                        courseToEdit.numberOfEnroll !== undefined &&
                        courseToEdit.numberOfEnroll > receiving
                      ? true
                      : false
                  }
                />
              )}
            </Grid>
          </Grid>

          <Box sx={{ width: "100%", height: "auto" }}>
            <Label
              sx={{
                ...(BreakPointBelow_md && {
                  fontSize: "12px",
                }),
              }}
            >
              Purpose *
            </Label>

            {trainingType?.purpose.map(
              (Type: { trainingTypeName: string }, index: number) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginLeft: "20px",
                    }}
                  >
                    <Checkbox
                      sx={{ color: "white" }}
                      checked={
                        purpose
                          ? purpose.includes(Type.trainingTypeName)
                          : false
                      }
                      onChange={() =>
                        handleCheckBoxPurpose(Type.trainingTypeName)
                      }
                    />
                    <Typography
                      sx={{
                        color: "white",
                        ...(BreakPointBelow_md && {
                          fontSize: "12px",
                        }),
                      }}
                    >
                      {Type.trainingTypeName}
                    </Typography>
                  </Box>
                </Box>
              )
            )}

            {/* <FormInput
              placeholder="Input your purpose here"
              value={purpose === null ? "" : purpose}
              onClick={() => handleFocus("Purpose")}
              autoFocus={isFocusPurpose}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPurpose(e.target.value);
              }}
            /> */}

            {/* {trainingType && trainingType.purpose && (
              <Select
                id="Purpose"
                value={purpose !== null ? purpose : ""}
                inputProps={{ "aria-label": "Without label" }}
                displayEmpty
                onChange={(e: SelectChangeEvent) => {
                  const selectedValue = e.target.value as string;

                  const isValidValue = trainingType.purpose.some(
                    (type) => type.trainingTypeName === selectedValue
                  );

                  if (isValidValue) {
                    setPurpose(selectedValue);
                  }
                }}
                sx={{
                  width: "100%",
                  color: "white",
                  borderColor: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: secondaryLightColor,
                    height: "42px",
                    borderRadius: "7px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: secondaryMainColor,
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "white",
                  },
                }}
                style={{ fontSize: "0.8225rem", fontFamily: "system-ui" }}
                size="small"
                input={
                  <OutlinedInput
                    sx={{ fontSize: "0.8225rem", fontFamily: "system-ui" }}
                  />
                }
                renderValue={() => {
                  if (purpose === null) {
                    return (
                      <Typography
                        sx={{
                          color: "grey",
                          fontSize: "0.8rem",
                          fontFamily: "system-ui",
                        }}
                      >
                        Input your purpose here
                      </Typography>
                    );
                  }
                  return purpose;
                }}
              >
                {trainingType.purpose.map(
                  (type: { trainingTypeName: string }, index: number) => (
                    <MenuItem key={index} value={type.trainingTypeName}>
                      {type.trainingTypeName}
                    </MenuItem>
                  )
                )}
              </Select>
            )} */}

            {!isSubmitPass && (
              <HelperText
                helperText="Purpose is required."
                error={purpose?.length === 0 || purpose === null ? true : false}
              ></HelperText>
            )}
          </Box>

          <Box sx={{ width: "100%", height: "auto" }}>
            <Label
              sx={{
                ...(BreakPointBelow_md && {
                  fontSize: "12px",
                }),
              }}
            >
              Description
            </Label>
            <FormInput
              placeholder="Input your description here"
              value={description}
              onClick={() => handleFocus("Description")}
              autoFocus={isFocusDescription}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              multiline
              rows={6}
            />
          </Box>
        </Box>

        {!isSubmitPass && (
          <Typography
            sx={{ color: "#F03A47", marginTop: "20px", fontSize: "12px" }}
          >
            Please follow the conditions of the form.
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {isEditedMode === true ? (
            <Typography
              onClick={handleCreateCourse}
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
              Edit
            </Typography>
          ) : (
            <Typography
              onClick={handleCreateCourse}
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
              Create
            </Typography>
          )}
          <Typography
            onClick={handleClickDialogClose}
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
      </Box>
    </Dialog>
  );
}
