import {
  FieldProps,
  ProcessedEvent,
  // ViewEvent,
} from "@aldabil/react-scheduler/types";

type CustomerProps = {
  customerId: string;
  customer_name: string;
  course_name: string;
  trained: number;
};

interface AssignedCustomer extends CustomerProps {
  event_id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  assign: string | any;
}

const assignedCustomer: AssignedCustomer[] = [
  {
    customerId: "1",
    customer_name: "Poohdude1",
    course_name: "Increase muscle1",
    trained: 1,
    event_id: "1",
    title: "Create muscle 1",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    description: "for muscle1",
    assign: "Poohdude1",
  },
  {
    customerId: "2",
    customer_name: "Poohdude2",
    course_name: "Increase muscle2",
    trained: 1,
    event_id: "2",
    title: "Create muscle 2",
    start: new Date(new Date().setHours(new Date().getHours() + 2)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    description: "for muscle2",
    assign: "Poohdude2",
  },
  {
    customerId: "3",
    customer_name: "Poohdude3",
    course_name: "Increase muscle1",
    trained: 1,
    event_id: "3",
    title: "Create muscle 3",
    start: new Date(new Date().setHours(new Date().getHours() + 4)),
    end: new Date(new Date().setHours(new Date().getHours() + 5)),
    description: "for muscle3",
    assign: "Poohdude3",
  },
  {
    customerId: "4",
    customer_name: "Poohdude4",
    course_name: "Increase muscle2",
    trained: 1,
    event_id: "4",
    title: "Create muscle 2",
    start: new Date(new Date().setHours(new Date().getHours() + 6)),
    end: new Date(new Date().setHours(new Date().getHours() + 7)),
    description: "for muscle4",
    assign: "Poohdude4",
  },
  {
    customerId: "5",
    customer_name: "Poohdude5",
    course_name: "Increase muscle1",
    trained: 3,
    event_id: "5",
    title: "Create muscle 5",
    start: new Date(new Date().setHours(new Date().getHours() + 8)),
    end: new Date(new Date().setHours(new Date().getHours() + 9)),
    description: "for muscle5",
    assign: "Poohdude5",
  },
  {
    customerId: "6",
    customer_name: "Poohdude6",
    course_name: "Increase muscle2",
    trained: 2,
    event_id: "6",
    title: "Create muscle 6",
    start: new Date(new Date().setHours(new Date().getHours() + 10)),
    end: new Date(new Date().setHours(new Date().getHours() + 11)),
    description: "for muscle6",
    assign: { test: "test", name: "eiei" },
  },
];

const allCustomers: CustomerProps[] = [
  {
    customerId: "1",
    customer_name: "Poohdude1",
    course_name: "Increase muscle1",
    trained: 1,
  },
  {
    customerId: "2",
    customer_name: "Poohdude2",
    course_name: "Increase muscle2",
    trained: 2,
  },
  {
    customerId: "3",
    customer_name: "Poohdude3",
    course_name: "Increase muscle1",
    trained: 3,
  },
  {
    customerId: "4",
    customer_name: "Poohdude4",
    course_name: "Increase muscle2",
    trained: 4,
  },
  {
    customerId: "5",
    customer_name: "Poohdude5",
    course_name: "Increase muscle1",
    trained: 5,
  },
  {
    customerId: "6",
    customer_name: "Poohdude6",
    course_name: "Increase muscle2",
    trained: 6,
  },
];

const EVENTS: ProcessedEvent[] = [
  {
    event_id: 2,
    title: "Trainer build muscle",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    // admin_id: 2,
    color: "orange",
    description: "Leg day!",
    assign: "Hertzy",
  },
  // {
  //   event_id: 6,
  //   title: "Event 6",
  //   start: new Date(
  //     new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
  //       new Date().getDate() - 4
  //     )
  //   ),
  //   end: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
  //   admin_id: 2,
  //   description: "Yo hello",
  //   color: "orange",
  //   assign: "qqqqq",
  // },
];
