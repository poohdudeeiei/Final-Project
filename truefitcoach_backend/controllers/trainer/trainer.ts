import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { OverlapTime } from "../../lib/time";

const Trainer = require("../../model/trainer");

var createError = require("http-errors");
interface AuthRequest extends Request {
  trainerId?: string;
}

exports.getTrainer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const trainerId = req.trainerId;

  try {

    const trainer = await Trainer.findById(trainerId).select(
      "trainer_email trainer_first_name trainer_last_name nickname phone_number _id"
    );
    if (!trainer) {
      throw createError(401, "No user exists");
    }

    return res.status(200).json({ trainer });
  } catch (error) {
    next(error);
  }
};

interface AssignedRequest extends Request {
  query: { start: string; end: string; course_name: string };
}

// Appointment route handler
exports.getAssigned = async (
  req: AssignedRequest,
  // req: Request<{}, {}, {}, AppointmentRequestQuery>,  // Specify the type for request query parameters
  res: Response,
  next: NextFunction
) => {
  const { start, end, course_name } = req.query;
  console.log(req.query)
  const startDate = new Date(start);
  const endDate = new Date(end);

  const rangeData = test.filter((data) => {
    const start = new Date(data.start);
    const end = new Date(data.end);
    return (
      start > startDate &&
      end < endDate &&
      data.course_name.includes(course_name)
    );
  });

  // const maxStart = new Date(
  //   Math.max(dataStartDateTime.getTime(), st.getTime())
  // );
  // const minEnd = new Date(
  //   Math.min(dataEndDateTime.getTime(), et.getTime())
  // );

  // // console.log(maxStart);
  // // console.log(minEnd);

  // if (maxStart < minEnd) {
  //   console.log("The date ranges overlap.");
  //   console.log(data.event_id);
  //   error.push(data.event_id);
  // } else {
  //   console.log("The date ranges do not overlap.");
  // }

  // const { page, pageSize } = req.query;

  // // Ensure page and pageSize are valid numbers or set default values
  // const pageNumber = page ? page : 1;
  // const pageSizeNumber = pageSize ? pageSize : 10;

  // const indexOfLastPost = (pageNumber - 1) * pageSizeNumber;
  // const indexOfFirstPost = indexOfLastPost + pageSizeNumber;

  // // Replace test with your actual data source or database query
  // const data = test.slice(indexOfLastPost, indexOfFirstPost);

  // Send the appointment data as JSON in the response
  const arrayFilter = test.map((data) => ({
    courseId: data.event_id,
    course_name: data.course_name,
  }));

  console.log(course_name);

  const courseFilter = Array.from(new Set(arrayFilter));

  res.status(200).json({
    assignedList: rangeData,
    totalPage: rangeData.length,
  });
};

exports.getAssignedFilters = async (
  req: Request,
  // req: Request<{}, {}, {}, AppointmentRequestQuery>,  // Specify the type for request query parameters
  res: Response,
  next: NextFunction
) => {
  const arrayFilter = test.map((data) => ({
    courseId: data.event_id,
    course_name: data.course_name,
  }));

  const courseFilter = Array.from(new Set(arrayFilter));
  res.status(200).json({ filters: courseFilter });
};

let test = [
  {
    //     appointmentId : ObjectId("xx"),
    // trainerId : ObjectId("xx"),
    // courseId : ObjectId("xx"),
    // enrollId : Object('xx'),
    customerId: "1",
    customer_name: "Poohdude1",
    course_name: "Increase muscle1",
    trained: 2,
    event_id: 1,
    title: "Create muscle 1",
    start: "Tue, Jan 23, 2024, 05:08:19 PM UTC",
    end: "Tue, Jan 23, 2024, 06:08:19 PM UTC",
    description: "for muscle1",
    assign: "Poohdude1",
    color: "green",
  },
  {
    customerId: "1",
    customer_name: "Poohdude2",
    course_name: "Increase muscle2",
    trained: 2,
    event_id: 2,
    title: "Create muscle 2",
    start: "Tue, Jan 23, 2024, 06:08:19 PM UTC",
    end: "Tue, Jan 23, 2024, 07:08:19 PM UTC",
    description: "for muscle2",
    assign: "Poohdude2",
  },
  {
    customerId: "1",
    customer_name: "Poohdude3",
    course_name: "Increase muscle3",
    trained: 2,
    event_id: 3,
    title: "Create muscle 3",
    start: "Tue, Jan 23, 2024, 07:08:19 PM UTC",
    end: "Tue, Jan 23, 2024, 08:08:19 PM UTC",
    description: "for muscle3",
    assign: "Poohdude3",
  },
  {
    customerId: "1",
    customer_name: "Poohdude4",
    course_name: "Increase muscle4",
    trained: 2,
    event_id: 4,
    title: "Create muscle 4",
    start: "Tue, Jan 23, 2024, 08:08:19 PM UTC",
    end: "Tue, Jan 23, 2024, 09:08:19 PM UTC",
    description: "for muscle4",
    assign: "Poohdude4",
  },
  {
    customerId: "1",
    customer_name: "Poohdude5",
    course_name: "Increase muscle5",
    trained: 2,
    event_id: 5,
    title: "Create muscle 5",
    start: "Tue, Jan 23, 2024, 09:08:19 PM UTC",
    end: "Tue, Jan 23, 2024, 10:08:19 PM UTC",
    description: "for muscle5",
    assign: "Poohdude5",
  },
  {
    customerId: "1",
    customer_name: "Poohdude6",
    course_name: "Increase muscle6",
    trained: 2,
    event_id: 6,
    title: "Create muscle 6",
    start: "Tue, Jan 23, 2024, 10:08:19 PM UTC",
    end: "Tue, Jan 23, 2024, 11:08:19 PM UTC",
    description: "for muscle6",
    assign: "Poohdude6",
  },
  {
    customerId: "1",
    customer_name: "Poohdude7",
    course_name: "Increase muscle7",
    trained: 2,
    event_id: 7,
    title: "Create muscle 7",
    start: "Tue, Jan 23, 2024, 11:08:19 PM UTC",
    end: "Wed, Jan 24, 2024, 12:08:19 AM UTC",
    description: "for muscle7",
    assign: "Poohdude7",
  },
  {
    customerId: "1",
    customer_name: "Poohdude8",
    course_name: "Increase muscle8",
    trained: 2,
    event_id: 8,
    title: "Create muscle 8",
    start: "Wed, Jan 24, 2024, 12:08:19 AM UTC",
    end: "Wed, Jan 24, 2024, 01:08:19 AM UTC",
    description: "for muscle8",
    assign: "Poohdude8",
  },
  {
    customerId: "1",
    customer_name: "Poohdude9",
    course_name: "Increase muscle9",
    trained: 2,
    event_id: 9,
    title: "Create muscle 9",
    start: "Wed, Jan 24, 2024, 01:08:19 AM UTC",
    end: "Wed, Jan 24, 2024, 02:08:19 AM UTC",
    description: "for muscle9",
    assign: "Poohdude9",
  },
  {
    customerId: "1",
    customer_name: "Poohdude10",
    course_name: "Increase muscle10",
    trained: 2,
    event_id: 10,
    title: "Create muscle 10",
    start: "Wed, Jan 24, 2024, 02:08:19 AM UTC",
    end: "Wed, Jan 24, 2024, 03:08:19 AM UTC",
    description: "for muscle10",
    assign: "Poohdude10",
  },
  {
    customerId: "1",
    customer_name: "Poohdude11",
    course_name: "Increase muscle11",
    trained: 2,
    event_id: 11,
    title: "Create muscle 1",
    start: "2024-01-18T10:08:16.815Z",
    end: "2024-01-18T11:08:16.815Z",
    description: "for muscle1",
    assign: "Poohdude1",
    color: "green",
  },
  {
    customerId: "1",
    customer_name: "Poohdude12",
    course_name: "Increase muscle12",
    trained: 2,
    event_id: 12,
    title: "Create muscle 1",
    start: "2024-01-17T10:08:16.815Z",
    end: "2024-01-17T11:08:16.815Z",
    description: "for muscle1",
    assign: "Poohdude1",
    color: "green",
  },
  {
    customerId: "1",
    customer_name: "Poohdude13",
    course_name: "Increase muscle13",
    trained: 2,
    event_id: 13,
    title: "Create muscle 1",
    start: "2024-01-16T10:08:16.815Z",
    end: "2024-01-16T11:08:16.815Z",
    description: "for muscle1",
    assign: "Poohdude1",
    color: "green",
  },
  {
    customerId: "14",
    customer_name: "Poohdude14",
    course_name: "Increase muscle13",
    trained: 5,
    event_id: 14,
    title: "Create muscle 14",
    start: new Date(new Date()),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    description: "for muscle1",
    assign: "Poohdude1",
    color: "#3fad26",
  },
];

const add = [
  {
    customerId: "1",
    // customerId: 1,
    customer_name: "Poohdude1",
    course_name: "Increase muscle1",
    trained: 2,
  },
  {
    customerId: "2",
    // customerId: 2,
    customer_name: "Poohdude2",
    course_name: "Increase muscle2",
    trained: 2,
  },
  {
    customerId: "3",
    // customerId: 3,
    customer_name: "Poohdude3",
    course_name: "Increase muscle3",
    trained: 2,
  },
  {
    customerId: "4",
    // customerId: 4,
    customer_name: "Poohdude4",
    course_name: "Increase muscle4",
    trained: 2,
  },
  {
    customerId: "5",
    // customerId: 5,
    customer_name: "Poohdude5",
    course_name: "Increase muscle5",
    trained: 2,
  },
  {
    customerId: "6",
    // customerId: 6,
    customer_name: "Poohdude6",
    course_name: "Increase muscle6",
    trained: 2,
  },
  {
    customerId: "7",
    // customerId: 7,
    customer_name: "Poohdude7",
    course_name: "Increase muscle7",
    trained: 2,
  },
  {
    customerId: "8",
    // customerId: 8,
    customer_name: "Poohdude8",
    course_name: "Increase muscle8",
    trained: 2,
  },
  {
    customerId: "9",
    // customerId: 9,
    customer_name: "Poohdude9",
    course_name: "Increase muscle9",
    trained: 2,
  },
  {
    customerId: "10",
    // customerId: 10,
    customer_name: "Poohdude10",
    course_name: "Increase muscle10",
    trained: 2,
  },
];

interface AppointmentRequest extends Request {
  query: { course_name: string };
}

exports.getAssign = async (
  req: AppointmentRequest,
  res: Response,
  next: NextFunction
) => {
  const { course_name } = req.query;
  
  try {
    const customerList = add.filter((course) =>
      course.course_name.includes(course_name)
    );

    res
      .status(200)
      .json({ customerList: customerList, totalPage: customerList.length });
  } catch (error) {
    next(error);
  }
};

let count = 14;

// Add assign
exports.postAssign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    customerId,
    customer_name,
    course_name,
    title,
    start,
    end,
    description,
    assign,
  } = req.body;

  try {
    if (
      !(
        customerId &&
        customer_name &&
        course_name &&
        title &&
        start &&
        end &&
        description &&
        assign
      )
    ) {
      throw createError(400, "All fields require");
    }
    console.log(req.body);
    const error = [];

    for (let data of test) {
      const overlap = OverlapTime({
        start,
        end,
        refStart: data.start,
        refEnd: data.end,
      });
      if (overlap) {
        error.push(data.event_id);
      }
      // const dataStartDateTime = new Date(data.start);
      // const st = new Date(start);
      // const dataEndDateTime = new Date(data.end);
      // const et = new Date(end);

      // const maxStart = Math.max(dataStartDateTime.getTime(), st.getTime());
      // const minEnd = Math.min(dataEndDateTime.getTime(), et.getTime());

      // if (maxStart < minEnd) {
      //   console.log("The date ranges overlap.");
      //   console.log(data.event_id);
      //   error.push(data.event_id);
      // } else {
      //   console.log("The date ranges do not overlap.");
      // }
    }

    if (error.length > 0) {
      return res.status(404).json({ message: "time overlap", error: error });
    }

    test.push({ ...req.body, event_id: count });
    count = count + 1;
    // console.log(test);
    res.status(200).json({ message: "assigned" });
  } catch (error) {}
};

exports.putAssigned = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const data = req.body;
  // const appointList = await Appointment.find({trainerId: trainerId,start: { $gte: date.start, $lte: date.end }})

  const { event_id, title, start, end, description } = req.body;

  try {
    if (!(event_id && title && start && end && description)) {
      throw createError(400, "All fields require");
    }

    const dataCompare: any = test.filter((data) => data.event_id !== event_id);

    const error = [];
    for (let data of dataCompare) {
      const overlap = OverlapTime({
        start,
        end,
        refStart: data.start,
        refEnd: data.end,
      });

      if (overlap) {
        error.push(data.event_id);
      }
    }

    if (error.length > 0) {
      return res.status(404).json({ message: "time overlap", error: error });
    }

    const indexToUpdate = test.findIndex((data) => data.event_id === event_id);
    console.log(indexToUpdate);
    if (indexToUpdate !== -1) {
      test[indexToUpdate] = {
        ...test[indexToUpdate],
        title: title,
        start: start,
        end: end,
        description: description,
      };
    }
    console.log(test);

    res.status(200).json({ message: "updated", fieldName: event_id });
  } catch (error) {
    next(error);
  }
};

exports.deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const appointmentId = req.body._id
  // const appointList = await Appointment.find({trainerId: trainerId,start: { $gte: date.start, $lte: date.end }})
  // if(appointList) {
  // const error = []
  //  for (let data of appointList) {
  //    if (req.body.start < data.end && data.start < req.body.end)
  //       error.push(data.event_id)
  //    }
  // }
  // if (error.length > 0) {
  //  return res.status(400).json({message: "Time overlap with other appoint", field : error})
  // }
  //
  //
  // const appointment = await Appointment.findByIdAndUpdate(appointmentId._id, {
  //   req.body
  // });

  const { event_id } = req.query as { event_id: string };
  console.log(event_id);
  try {
    if (!event_id) {
      throw createError(400, "No eventId");
    }
    test = test.filter((item) => item.event_id !== parseInt(event_id));
    res.status(200).json({ message: "complete deleted" });
  } catch (error) {
    next(error);
  }
};

interface ProgressRequest extends Request {
  query: { course: string; page: string; pageSize: string };
}

// Appointment collection search by status or end date compare date now
exports.getProgressCustomers = async (
  req: ProgressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course, page, pageSize } = req.query;

    const pageNumber = parseInt(page);
    const sizePerPage = parseInt(pageSize);

    const startIndex = (pageNumber - 1) * sizePerPage;
    const endIndex = startIndex + sizePerPage;

    const data = test.filter((data) => {
      if (course === "") {
        return String(data.event_id).includes(course);
      } else {
        return String(data.event_id) === course
      }
    });

    const customers = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / sizePerPage);

    res.status(200).json({ progressLists: customers, totalPages: totalPages });
  } catch (error) {
    next(error);
  }
};
