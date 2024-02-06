import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import { body, validationResult, ValidationError } from "express-validator";
import { isHttpError } from "http-errors";

const createError = require("http-errors");
const fs = require("fs");
const path = require("path");

dotenv.config();

const cors = require("cors");
const app: Express = express();
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const purposeRouter = require("./routes/purpose");
const trainerRouter = require("./routes/trainer");
const courseManagementRouter = require("./routes/course_management");
const addressRouter = require("./routes/address");
const filterRouter = require("./routes/filter");

const {
  userUpload,
  trainerUpload,
} = require("./services/image-upload/imgUpload");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/trainer", trainerRouter);
app.use("/purpose", purposeRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/courseManagement", courseManagementRouter);
app.use("/address", addressRouter);
app.use("/", filterRouter);
//test single photo
app.post(
  "/api/image",
  // trainerUpload.array("files", 3),
  trainerUpload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw createError(400, "No file!");
      }
      console.log(req.file);

      const imageUrl = req.file.path.replace("\\", "/");

      // Save this data to a database probably
      console.log(imageUrl);
      res.status(200).send({ imageUrl });
    } catch (error) {
      next(error);
    }
  }
);

//test multi file photo
app.post(
  "/api/images",
  userUpload.array("photos", 3),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) {
        throw createError(400, "No file!");
      }
      const imagePathList = (req.files as Express.Multer.File[]).map(
        (photo) => {
          const imageUrl = photo.path.replace(/\\/g, "/");
          return imageUrl;
        }
      );
      // console.log(imagePathList)
      res
        .status(200)
        .json({ status: "Upload Successful!", imageLists: imagePathList });
    } catch (error) {
      next(error);
    }
  }
);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

mongoose
  .connect(process.env.MONGO_URI_POOH,
  {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: true
  })
  .then(() => {
    const server = app.listen(process.env.API_PORT);
    const io = require("./socket").init(server);
    io.on("connection", (socket: Socket) => {
      console.log("Client connected");
    });
  })
  .catch((err: ErrorRequestHandler) => console.log(err));
