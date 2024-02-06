import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Router, { useRouter } from "next/router";

interface TrainerType {
  trainerId: any;
  courseName: string;
  courseImage: string;
  trainingTypeId: any;
  trainingPeriod: string;
  numDaysPerWeek: string;
  trainingTime: string;
  description: string;
  purpose: string[];
  receiving: number;
  isAvailable: boolean;
  numberOfEnroll: number;
}

export const TrainerCard = ({ course }: { course: TrainerType }) => {
  const {
    purpose,
    trainerId,
    courseName,
    courseImage,
    trainingPeriod,
    description,
  } = course;

  const router = useRouter();

  return (
    <Box
      onClick={() => router.push(`/setup/trainer-detail/${trainerId.nickname}`)}
      sx={{
        width: "100%",
        gap: "10px",
        paddingBottom: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
        height: "fit-content",
        borderRadius: "5px",
        borderBottom: "1px solid gray",
        transition: "0.5s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.4)",
          cursor: "pointer",
        },
      }}
    >
      <Image
        priority
        width={300}
        height={300}
        src={process.env.NEXT_PUBLIC_ENDPOINT + "/" + courseImage}
        alt={courseName}
        style={{ width: "100%", borderRadius: "5px" }}
      />
      <Typography
        sx={{
          padding: "0rem 0.2rem",
          fontWeight: "650",
          fontSize: "20px",
          width: "100%",
        }}
      >
        {courseName}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "0rem 0.2rem",
          gap: "8px",
        }}
      >
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Avatar alt="Remy Sharp" sx={{ width: "25px", height: "25px" }} />{" "}
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            {trainerId.nickname}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            flexWrap: "wrap",
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {/* <Typography sx={{ fontWeight: "500" }}>Purpose</Typography> */}

          {purpose.map((type: string, index: number) => {
            return (
              <Chip
                sx={{ m: 0, p: 0 }}
                variant="filled"
                label={type}
                size="small"
                key={index}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
