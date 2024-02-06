import { useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import CourseManagementHeader from "./content/header/CourseManagementHeader";
import CreateCourseDialog from "./content/create_course_dialog/CreateCourseDialog";
import CourseType from "@/models/pages/course_management/CourseType";
import CoursesCard from "./content/courses_card/CoursesCard";
import CardDialog from "./content/courses_card/CardDialog";
import useSWR from "swr";
import { useAuth } from "@/้hooks/useAuth";
import {
  LIST_COURSE,
  DELETE_COURSE,
} from "@/services/endpoint/courseManagement";
import {
  listCoursesFetcher,
  deleteCoursesFetcher,
} from "@/services/api/courseManagementAPI/courseManagementAPI";
import { useSnackbar } from "notistack";

export default function CourseManagementLayout() {
  const theme = useTheme();
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  const {
    data: Courses,
    error: fetchError,
    mutate: mutateListCourses,
  } = useSWR<CourseType[]>(
    auth.token === null ? null : [LIST_COURSE, auth.token],
    ([url, token]) =>
      listCoursesFetcher(
        url,
        token === null || token === undefined ? null : (token as string)
      )
  );

  const [courses, setCourses] = useState<CourseType[]>([]);

  const [defaultCourse, setDefaultCourse] = useState<CourseType>({
    courseId: null,
    courseImage: null,
    courseName: null,
    trainingPeriod: null,
    numDaysPerWeek: null,
    trainingTime: null,
    purpose: null,
    description: "",
    receiving: null,
  });

  const [courseToEdit, setCourseToEdit] = useState<CourseType>({
    courseId: null,
    courseImage: null,
    courseName: null,
    trainingPeriod: null,
    numDaysPerWeek: null,
    trainingTime: null,
    purpose: null,
    description: "",
    receiving: null,
  });

  const [courseToShow, setCourseToShow] = useState<CourseType>({
    courseId: null,
    courseImage: null,
    courseName: null,
    trainingPeriod: null,
    numDaysPerWeek: null,
    trainingTime: null,
    purpose: null,
    description: "",
    receiving: null,
    isAvailable: null,
    numberOfEnroll: null,
  });

  const [filteredSearchCourses, setFilteredSearchCourses] =
    useState<CourseType[]>(courses);

  const [selectIcon, setSelectIcon] = useState<String>("");
  const [searchText, setSearchText] = useState<String>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectCardCourseId, setSelectCardCourseId] = useState<string | null>(
    null
  );
  const [isEditedMode, setIsEditedMode] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [selectedDeleteCourses, setSelectedDeleteCourses] = React.useState<
    string[]
  >([]);
  const [isCanDelete, setIsCanDelete] = useState<boolean>(false);

  const handleClickDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClickDialogClose = () => {
    setCourseToEdit(defaultCourse);
    setIsDialogOpen(false);
    setTimeout(() => {
      setIsEditedMode(false);
    }, 300);
  };

  const handleClickCardDialogClose = () => {
    setIsCardDialogOpen(false);
  };

  const handleClickCardDialogOpen = (courseId: string) => {
    setIsCardDialogOpen(true);
    setSelectCardCourseId(courseId);
  };

  useEffect(() => {
    console.log(Courses);

    if (Courses) {
      setCourses(Courses);
    } else {
      setCourses([]);
    }
  }, [Courses]);

  useEffect(() => {
    setSelectCardCourseId(null);
    if (courses) {
      setFilteredSearchCourses(courses);
    } else {
      setCourses([]);
    }
  }, [courses]);

  useEffect(() => {
    if (isDeleteMode === false) {
      setSelectedDeleteCourses([]);
    }
    if (isDeleteMode === true) {
      setIsCanDelete(courses.length > 0);
    }
  }, [isDeleteMode, courses]);

  useEffect(() => {
    if (isSearchOpen === false || searchText === "") {
      setSearchText("");
      setFilteredSearchCourses(courses);
    }
  }, [isSearchOpen, searchText, courses]);

  useEffect(() => {
    const filteredCourses = courses.filter(
      (course) => course.courseId === selectCardCourseId
    );
    setCourseToShow(filteredCourses[0]);
  }, [selectCardCourseId]);

  // useEffect(() => {
  //   if (
  //     courseToCreate.courseName !== null &&
  //     courseToCreate.trainingPeriod !== null &&
  //     courseToCreate.trainingTime !== null &&
  //     courseToCreate.purpose !== null &&
  //     courseToCreate.description !== ""
  //   ) {
  //     setCourses((prevCourses) => [...prevCourses, courseToCreate]);
  //   }
  // }, [courseToCreate]);

  // useEffect(() => {
  //   if (
  //     editCourse.courseId !== null &&
  //     editCourse.courseName !== null &&
  //     editCourse.trainingPeriod !== null &&
  //     editCourse.trainingTime !== null &&
  //     editCourse.purpose !== null &&
  //     editCourse.description !== ""
  //   ) {
  //     const deletePrvEditCourses = courses.filter(
  //       (course) => course.courseId !== editCourse.courseId
  //     );

  //     setCourses(() => [...deletePrvEditCourses, editCourse]);
  //     setEditCourse(defaultCourse);
  //   }
  // }, [editCourse]);

  const handleIconClick = (index: number) => {
    if (index === 0) {
      setSelectIcon(selectIcon === "SearchIcon" ? "" : "SearchIcon");
      setSearchText("");
    } else if (index === 1) {
      handleClickDialogOpen();
      setSearchText("");
    } else if (index === 2) {
      setSelectIcon(selectIcon === "DeleteIcon" ? "" : "DeleteIcon");
      setSearchText("");
    }
  };

  const handleDeleteSelectedCourses = async () => {
    if (Courses) {
      await deleteCoursesFetcher(
        selectedDeleteCourses,
        DELETE_COURSE,
        auth.token === null ? null : auth.token
      );

      mutateListCourses();
    }
    enqueueSnackbar("Delete course complete", { variant: "success" });
  };

  const handleSearchCourses = () => {
    setFilteredSearchCourses(
      courses.filter((course) =>
        course.courseName?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const handleEditCourse = (courseId: string) => {
    setCourseToEdit(defaultCourse);
    const EditCourse = courses.filter((course) => course.courseId === courseId);
    setCourseToEdit(EditCourse[0]);
    setIsEditedMode(true);
    setIsDialogOpen(true);
  };

  let contentRender;
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
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));

  const RenderLayoutForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <CourseManagementHeader
          handleIconClick={handleIconClick}
          searchText={searchText}
          setSearchText={setSearchText}
          setIsSearchOpen={setIsSearchOpen}
          isSearchOpen={isSearchOpen}
          setIsDeleteMode={setIsDeleteMode}
          isDeleteMode={isDeleteMode}
          handleSearchCourses={handleSearchCourses}
          handleDeleteSelectedCourses={handleDeleteSelectedCourses}
          isCanDelete={isCanDelete}
          selectedDeleteCourses={selectedDeleteCourses}
          mutateListCourses={mutateListCourses}
        ></CourseManagementHeader>

        <CreateCourseDialog
          isDialogOpen={isDialogOpen}
          handleClickDialogClose={handleClickDialogClose}
          courseToEdit={courseToEdit}
          handleEditCourse={handleEditCourse}
          isEditedMode={isEditedMode}
          mutateListCourses={mutateListCourses}
        ></CreateCourseDialog>

        <CoursesCard
          isTrainerManage={true}
          filteredSearchCourses={filteredSearchCourses}
          isSearchOpen={isSearchOpen}
          handleClickCardDialogOpen={handleClickCardDialogOpen}
          isDeleteMode={isDeleteMode}
          selectedDeleteCourses={selectedDeleteCourses}
          setSelectedDeleteCourses={setSelectedDeleteCourses}
          handleEditCourse={handleEditCourse}
          mutateListCourses={mutateListCourses}
        ></CoursesCard>

        <CardDialog
          isTrainerManage={true}
          isCardDialogOpen={isCardDialogOpen}
          handleClickCardDialogClose={handleClickCardDialogClose}
          courseToShow={courseToShow}
        ></CardDialog>
      </Box>
    );
    return contentRender;
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointBetween_sm_md:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointBetween_md_lg:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointBetween_lg_xl:
      RenderLayoutForBaseDevices();
      break;
    case BreakPointUp_xl:
      RenderLayoutForBaseDevices();
      break;
    default:
      contentRender = <Box>Course Management Page!</Box>;
      break;
  }

  return <>{contentRender}</>;
}

CourseManagementLayout.trainerGuard = true;
