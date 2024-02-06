import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import TrainerPhoto from "../../../../public/trainer-in-fitness-male3.png";
import Divider from "@mui/material/Divider";
import { useMediaQuery, useTheme } from "@mui/material";
import { TrainerDetailType } from "@/models/pages/find_trainers";
import Link from "next/link";

type TrainerDetail = {
  nickname: string;
  firstName: string;
  lastName: string;
  experience: string;
  expertise: string;
  qualification: string;
  teachingStyle: string;
  location: String;
};

export default function CardTrainer({
  Trainer,
}: {
  Trainer: TrainerDetailType;
}) {
  let sales: number = 5;

  const theme = useTheme();

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
      <Link href={`/setup/trainer-detail/${Trainer.nickname}`} style={{textDecoration:"none"}}>
        <Card 
          sx={{
            bgcolor: "#242424",
            padding: "30px 0px 0px 0px",
            minWidth: 100,
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.2s, box-shadow 0.2s", // Add a smooth transition for the hover effect
            "&:hover": {
              transform: "scale(1.02)", // Scale up the component on hover
              boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.9)", // Add a subtle shadow on hover
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <Image
              src={TrainerPhoto}
              width={200}
              height={200}
              alt="hi"
              style={{ width: "150px", height: "150px", borderRadius: "10rem" }}
            />
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold", color: "white" }}
            >
              {Trainer.nickname}
            </Typography>
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              gutterBottom
            >
              {Trainer.firstName + " " + Trainer.lastName}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",

                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: "white" }}
              >
                Experience : {Trainer.experience}
              </Typography>

              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: "white" }}
              >
                Expertise : {Trainer.expertise}
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: "white" }}
              >
                Qualification : {Trainer.qualification}
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: "white" }}
              >
                Teaching style : {Trainer.teachingStyle}
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: "white" }}
              >
                Location : {Trainer.location}
              </Typography>
            </Box>
          </CardContent>
          <Divider sx={{ bgcolor: "white" }} />
          <Box
            sx={{
              padding: "5px 5px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                paddingRight: "10px",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <StarIcon sx={{ color: "pink" }} />
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "white" }}
              >
                1
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  paddingRight: "10px",
                  color: "white",
                }}
              >
                ({"39 reviews"})
              </Typography>
              {sales && sales > 0 ? (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: "white" }}
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  >
                    {sales} sales
                  </Typography>
                </>
              ) : null}
            </Box>
          </Box>
        </Card>
      </Link>
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
      contentRender = <Box>Home Layout!</Box>;
      break;
  }

  return <>{contentRender}</>;
}
