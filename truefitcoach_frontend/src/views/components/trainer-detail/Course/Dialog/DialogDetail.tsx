import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Link from "next/link";
interface CourseDetails {
  target: string;
  duration: string;
  exerciseType: string;
  content: string[];
}

interface CourseSchedule {
  exerciseDaysPerWeek: number;
  exerciseDaysOfWeek: string[];
  exerciseVariety: string;
}

interface Instructor {
  name: string;
  experienceYears: number;
  specialization: string;
}

interface Course {
  courseName: string;
  details: CourseDetails;
  schedule: CourseSchedule;
  instructors: Instructor[];
  equipmentRequired: string[];
  benefits: string[];
  recommendations: string[];
}

const course: Course = {
  courseName: "คอร์สออกกำลังกายเพื่อสุขภาพดี",
  details: {
    target:
      "คอร์สนี้เหมาะสำหรับผู้ที่ต้องการเริ่มต้นการออกกำลังกายหรือเพิ่มสุขภาพทั่วไป",
    duration: "12 สัปดาห์",
    exerciseType: "การออกกำลังกายแบบมีอุปกรณ์และแบบไม่มีอุปกรณ์",
    content: [
      "การบริหารกล้ามเนื้อและการเสริมสร้างความแข็งแรง",
      "การวิ่ง",
      "การเล่นการบ้านแบบเพิ่มความแข็งแรง",
      "การยืดและการฟื้นฟูร่างกาย",
      "คำแนะนำเกี่ยวกับโภชนาการและการบำบัดทางกายภายหลังการออกกำลังกาย",
    ],
  },
  schedule: {
    exerciseDaysPerWeek: 5,
    exerciseDaysOfWeek: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],
    exerciseVariety: "การฝึกออกกำลังกายที่หลากหลาย",
  },
  instructors: [
    {
      name: "John Doe",
      experienceYears: 5,
      specialization: "การบริหารกล้ามเนื้อและการเสริมสร้างรูปร่างร่างกาย",
    },
  ],
  equipmentRequired: [
    "พร้อมพงษ์เพื่อการยืด",
    "แบล็คดร็อบเบิลเพื่อการฝึกกล้ามเนื้อ",
    "รองเท้าวิ่ง",
  ],
  benefits: [
    "เพิ่มความแข็งแรงและความทนทานของร่างกาย",
    "ลดน้ำหนักหรือควบคุมน้ำหนัก",
    "สร้างกล้ามเนื้อและเสริมสร้างรูปร่างร่างกาย",
    "พัฒนาความยืดหยุ่นและความแข็งแรงของกล้ามเนื้อ",
    "ส่งเสริมสุขภาพใจและสมอง",
  ],
  recommendations: [
    "ปรึกษาแพทย์ก่อนเริ่มคอร์สการออกกำลังกายใหม่ๆ โดยเฉพาะถ้าคุณมีปัญหาเกี่ยวกับสุขภาพ",
    "รับประทานอาหารที่สมดุลและควบคุมปริมาณการบริโภคพลังงาน",
    "ให้ร่างกายมีการพักผ่อนเพียงพอและรับนอนให้เต็มประจำ",
  ],
};

const spanCustom = (text: string) => {
  return <span style={{ fontWeight: "bold" }}>{text}</span>;
};

const DialogDetail = () => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "",
        borderRadius: "3px",
        padding: "2% 6%",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <Typography sx={{textIndent:"5%"}}>
        {"เนื้อหารายละเอียดการสอน จะเป็นข้อดีหรือการเเนะนำคอร์ส"}
      </Typography>
      <Typography>
        {spanCustom("Duration : ")} {course.details.duration}
      </Typography>
      <Typography>
        {spanCustom("Target : ")} {course.details.target}
      </Typography>
      <Typography>
        {spanCustom("Recommendations : ")} {course.recommendations.join(", ")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {" "}
        <Typography>{spanCustom("Category ")}</Typography>
        <Stack direction="row" spacing={2}>
            <Link href="/"><Chip label="Clickable" onClick={handleClick} /></Link>
          <Chip label="Clickable" onClick={handleClick} />
          <Chip label="Clickable" onClick={handleClick} />
        </Stack>
      </Box>
    </Box>
  );
};

export default DialogDetail;
