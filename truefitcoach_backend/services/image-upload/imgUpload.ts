import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import multer, { diskStorage, FileFilterCallback } from "multer";

const fs = require("fs");

const userFileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null | Error, destination: string) => void
  ) => {
    const subdirectory = `images/users`;

    // Ensure the subdirectory exists, create it if not
    fs.mkdirSync(subdirectory, { recursive: true });
    cb(null, subdirectory);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null | Error, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const trainerFileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null | Error, destination: string) => void
  ) => {
    const subdirectory = `images/trainers`;

    // Ensure the subdirectory exists, create it if not
    fs.mkdirSync(subdirectory, { recursive: true });
    cb(null, subdirectory);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null | Error, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const userUpload = multer({
  storage: userFileStorage,
  fileFilter: fileFilter,
});

export const trainerUpload = multer({
  storage: trainerFileStorage,
  fileFilter: fileFilter,
});
