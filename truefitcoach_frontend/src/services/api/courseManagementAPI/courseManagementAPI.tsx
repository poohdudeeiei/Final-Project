import axios from "axios";
import CourseType from "@/models/pages/course_management/CourseType";
import { useAuth } from "@/้hooks/useAuth";

export const createCourseFetcher = async (
  courseToCreate: CourseType,
  url: string,
  token: string | null
) => {
  try {
    const response = await axios.post(
      url,
      {
        courseImage: courseToCreate.courseImage,
        courseName: courseToCreate.courseName,
        trainingPeriod: courseToCreate.trainingPeriod,
        numDaysPerWeek: courseToCreate.numDaysPerWeek,
        trainingTime: courseToCreate.trainingTime,
        purpose: courseToCreate.purpose,
        description: courseToCreate.description,
        receiving: courseToCreate.receiving,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Failed to create course");
    }
  } catch (error) {
    console.log(error);
  }
};

export const listCoursesFetcher = async (url: string, token: string | null) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.status === 202 || response.status === 204) {
      return response.data;
    } else {
      throw new Error("Failed to fetch list courses");
    }
  } catch (error) {
    console.log(error);
  }
};

export const editCoursesFetcher = async (
  courseToEdit: CourseType,
  url: string,
  token: string | null
) => {
  try {
    const response = await axios.put(
      url,
      {
        courseId: courseToEdit.courseId,
        courseImage: courseToEdit.courseImage,
        courseName: courseToEdit.courseName,
        trainingPeriod: courseToEdit.trainingPeriod,
        numDaysPerWeek: courseToEdit.numDaysPerWeek,
        trainingTime: courseToEdit.trainingTime,
        purpose: courseToEdit.purpose,
        description: courseToEdit.description,
        receiving: courseToEdit.receiving,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Failed to edit course");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCoursesFetcher = async (
  courseIds: string[],
  url: string,
  token: string | null
) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        courseIds: courseIds,
      },
    });

    if (response.status !== 202) {
      throw new Error("Failed to delete course");
    }
  } catch (error) {
    console.log(error);
  }
};
