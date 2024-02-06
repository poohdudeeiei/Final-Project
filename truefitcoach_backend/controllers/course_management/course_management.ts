import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { clearImage } from "../utils/clear-image";
import { CourseType } from "../../model/course";
import { PurposeType } from "../../model/purpose";
const { encodedAccessToken } = require("../../services/authentication/token");

const courseModel = require("../../model/course");
const purposeModel = require("../../model/purpose");
const userModel = require("../../model/user");

exports.createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let courseImage = null;
    let trainingTypeIds;
    const token = req.headers.authorization;
    const userToken = await encodedAccessToken(token);
    const {
      courseName,
      trainingPeriod,
      numDaysPerWeek,
      trainingTime,
      purpose,
      description,
      receiving,
    } = req.body;

    if (purpose && purpose.length > 0) {
      trainingTypeIds = await Promise.all(
        purpose.map(async (purpose: PurposeType) => {
          const foundPurpose = await purposeModel.findOne({
            trainingTypeName: purpose,
          });

          if (foundPurpose) {
            return foundPurpose._id;
          } else {
            throw new Error(`Invalid purpose: ${purpose}`);
          }
        })
      );
    }

    const findUser = await userModel.findOne({
      _id: userToken._id,
    });

    if (req.file) {
      courseImage = req.file.path.replace(/\\/g, "/");
    }

    if (req.body) {
      console.log(receiving);
      await courseModel.create({
        trainerId: findUser.trainerId,
        trainingTypeId: trainingTypeIds,
        courseImage: courseImage,
        courseName: courseName,
        trainingPeriod: trainingPeriod,
        numDaysPerWeek: numDaysPerWeek,
        trainingTime: trainingTime,
        purpose: purpose,
        description: description,
        receiving: receiving,
        isAvailable: true,
        numberOfEnroll: 0,
      });
      res.status(201).json({ message: "Create course complete" });
      console.log("Create course complete");
    }
  } catch (err) {
    console.error(err);
    next(createError(500, "Failed to create course"));
  }
};

exports.listCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let numberOfEnroll = 5;
    const token = req.headers.authorization;
    const userToken = await encodedAccessToken(token);
    const findUser = await userModel.findOne({
      _id: userToken._id,
    });

    const courses = await courseModel.find({ trainerId: findUser.trainerId });

    if (courses.length === 0) {
      res.status(204).json({ message: "No courses found" });
    } else {
      const formattedCourses = courses.map((course: CourseType) => ({
        courseId: course._id,
        courseImage:
          course.courseImage !== null
            ? "http://localhost:8080/" + course.courseImage
            : null,
        courseName: course.courseName,
        trainingPeriod: course.trainingPeriod,
        numDaysPerWeek: course.numDaysPerWeek,
        trainingTime: course.trainingTime,
        purpose: course.purpose,
        description: course.description,
        receiving: course.receiving,
        isAvailable: numberOfEnroll < course.receiving,
        numberOfEnroll: numberOfEnroll,
      }));

      res.status(202).json(formattedCourses);
    }
  } catch (err) {
    next(createError(500, "Failed to fetch list courses"));
  }
};

exports.editCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let editCourseImage = null;
    let trainingTypeIds;
    const {
      courseId,
      courseImage,
      courseName,
      trainingPeriod,
      numDaysPerWeek,
      trainingTime,
      purpose,
      description,
      receiving,
      numberOfEnroll,
    } = req.body;

    const oldCourse = await courseModel.findById(courseId);

    if (req.file) {
      if (oldCourse.courseImage !== null) {
        clearImage(oldCourse.courseImage);
      }
      editCourseImage = req.file.path.replace(/\\/g, "/");
    } else {
      editCourseImage = courseImage;
    }

    if (!oldCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (req.body) {
      trainingTypeIds = await Promise.all(
        purpose.map(async (purpose: string) => {
          const foundPurpose = await purposeModel.findOne({
            trainingTypeName: purpose,
          });

          if (foundPurpose) {
            return foundPurpose._id;
          } else {
            throw new Error(`Invalid purpose: ${purpose}`);
          }
        })
      );
    }

    if (req.body) {
      await courseModel.findByIdAndUpdate(courseId, {
        trainingTypeId: trainingTypeIds,
        courseImage: editCourseImage,
        courseName: courseName,
        trainingPeriod: trainingPeriod,
        numDaysPerWeek: numDaysPerWeek,
        trainingTime: trainingTime,
        purpose: purpose,
        description: description,
        receiving: receiving,
        isAvailable: numberOfEnroll < receiving,
        numberOfEnroll: numberOfEnroll,
      });

      res.status(201).json({ message: "Edit course complete" });
      console.log("Edit course complete");
    }
  } catch (err) {
    next(createError(500, "Failed to edit courses"));
  }
};

exports.deleteCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseIds } = req.body;

    if (!courseIds || !Array.isArray(courseIds)) {
      return res.status(400).json({ message: "Invalid or missing courseIds" });
    }
    const oldCourse = await courseModel.findById(courseIds);

    if (req.body) {
      const coursesToDelete = await courseModel.find({
        _id: { $in: courseIds },
      });
      coursesToDelete.forEach((course: CourseType) => {
        if (course.courseImage !== null) {
          clearImage(course.courseImage);
        }
      });

      await courseModel.deleteMany({ _id: { $in: courseIds } });
      res.status(202).json({ message: "Delete course complete" });
      console.log("Delete course complete");
    }
  } catch (err) {
    next(createError(500, "Failed to Delete courses"));
  }
};
