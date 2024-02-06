// const Subdistrict = require("./model/subdistrict");
// Subdistrict.create({
//   id: "100102",
//   zip_code: "10200",
//   name_th: "วังบูรพาภิรมย์",
//   name_en: "Wang Burapha Phirom",
//   amphure_id: "1",
// });
// const District = require("./model/district");
// District.create({
//   id: "1",
//   code: "1001",
//   name_th: "เขตพระนคร",
//   name_en: "Khet Phra Nakhon",
//   province_id: "1",
// });
// // const Purpose = require("./model/purpose");
// const Province = require("./model/province");
// Province.create({
//   id: "1",
//   code: "10",
//   name_th: "กรุงเทพมหานคร",
//   name_en: "Bangkok",
//   geography_id: "2",
// });

// const Purpose = require("./model/purpose");
// Purpose.create({ type:1,trainingTypeName: "Strength and Muscle Gain" });
// Purpose.create({ type:2,trainingTypeName: "Weight Loss and Fat Burn" });
// Purpose.create({ type:3,trainingTypeName: "General Fitness and Conditioning" });
// Purpose.create({ type:4,trainingTypeName: "Flexibility Enhancement" });
// Purpose.create({ type:5,trainingTypeName: "Stress Reduction and Mental Health" });
// Purpose.create({ type:6,trainingTypeName: "Sports or Special Activities Preparation" });
// Purpose.create({ type:7,trainingTypeName: "Injury Prevention" });
// Purpose.create({ type:8,trainingTypeName: "Cardiovascular Health Improvement" });
// Purpose.create({ type:9,trainingTypeName: "Occupational or Specialized Activities" });

// Purpose.create({ type:1,trainingTypeName: "Strength and Muscle Gain" });
// Purpose.create({ type:2,trainingTypeName: "Weight Loss and Fat Burn" });
// Purpose.create({ type:3,trainingTypeName: "General Fitness and Conditioning" });
// Purpose.create({ type:4,trainingTypeName: "Flexibility Enhancement" });
// Purpose.create({ type:5,trainingTypeName: "Stress Reduction and Mental Health" });
// Purpose.create({ type:6,trainingTypeName: "Sports or Special Activities Preparation" });
// Purpose.create({ type:7,trainingTypeName: "Injury Prevention" });
// Purpose.create({ type:8,trainingTypeName: "Cardiovascular Health Improvement" });
// Purpose.create({ type:9,trainingTypeName: "Occupational or Specialized Activities" });


const start1 = new Date();
const end1 = new Date(new Date().setHours(new Date().getHours() + 9))

const start2 = new Date(new Date().setHours(new Date().getHours() + 1))
const end2 = new Date(new Date().setHours(new Date().getHours() + 2))

const eiei = [
  {
    customerId: "1",
    customer_name: "Poohdude1",
    course_name: "Increase muscle1",
    trained: 1,
    event_id: "1",
    title: "Create muscle 1",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    description: "for muscle",
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
    description: "for muscle",
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
    description: "for muscle",
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
    description: "for muscle",
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
    description: "for muscle",
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
    description: "for muscle",
    assign: "Poohdude6",
  },
];

for (let data of eiei) {
  if (start1 < data.end && data.start < end1) {
    console.log("The date ranges overlap.");
    console.log(data.event_id)
  } else {
    console.log("The date ranges do not overlap.");
  }
}

eiei.forEach((data, index) => {
  if (data.event_id === "1") {
    eiei[index] = { ...data, event_id: "1000" }
  }
})


console.log(eiei[0])


// console.log(updatedEiei[0]);


const generateMockData = (count, trainerId) => {
  const mockData = [];

  for (let i = 1; i <= count; i++) {
    const appointment = {
      trainerId: trainerId,
      // courseId: `course${i}`,
      courseId: `course${"1"}`,
      enrollId: i,
      event_id: i,
      title: `Appointment ${i}`,
      startTime: new Date(new Date().setHours(new Date().getHours() + i)),
      endTime: new Date(new Date().setHours(new Date().getHours() + i + 1)),
      description:  `Appointment ${i}`,
      assign:  `Appointment ${i}`,
      come: false,
    };

    mockData.push(appointment);
  }

  return mockData;
};

const mockData = generateMockData(30, 'yourTrainerId'); // Replace 'yourTrainerId' with the actual trainerId
console.log(mockData);

// get week range
let curr = new Date('Sun Jan 21 2024 23:59:59 GMT+0700 (Indochina Time)') 
let week = []
console.log(curr)
for (let i = 0; i < 7; i++) {
  let first = curr.getDate() - curr.getDay() + i 
  let day = new Date(curr.setDate(first));
  
  // Extract date, month, and year
  let formattedDate = day.toISOString().split('T')[0];
  
  week.push(formattedDate)
}

const refDate = new Date(date);
  refDate.setHours(0, 0, 0, 0);

  const startDay = refDate.getDate() - refDate.getDay();
  const endDay = refDate.getDate() - refDate.getDay() + 7;

  const startWeek = new Date(refDate.setDate(startDay));
  const endWeek = new Date(refDate.setDate(endDay));

  const rangeDate = test.filter((data) => {
    const start = new Date(data.start);
    const end = new Date(data.end);
    return start > startWeek && end < endWeek;
  });
