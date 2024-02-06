import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import TrainerPhoto from "../../../../../public/trainer-in-fitness-male3.png";
import styled from "@mui/system/styled";
import { useTheme } from "@mui/system";
import { Divider, Paper, useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { ReviewContent } from "./ReviewsContent";
const GridStyle = styled(Grid)({
  color: "black",
  backgroundColor: "",
  display: "flex",
  padding: "1%",
});

type reviews = {
  name: string;
  rate: number;
  comment: string;
  cid: string;
  date: string;
};

const reviews: reviews = {
  name: "eiei",
  rate: 5,
  comment: "This is amazing!",
  cid: "CID101",
  date: "08/05/2020",
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  margin: "0% 0.5%",
  width: "40%",
  height: 10,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const score = [
  {
    rate: 5,
    count: 50,
  },
  {
    rate: 4,
    count: 20,
  },
  {
    rate: 3,
    count: 20,
  },
  {
    rate: 2,
    count: 5,
  },
  {
    rate: 1,
    count: 5,
  },
];

export default function Reviews() {
  const theme = useTheme();
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
  const BreakPoint_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const BreakPoint_xl = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Box
      sx={{
        bgcolor: "#BCBCBC",
        padding: "10px",
        borderRadius: "5px",
        maxWidth: "1440px",
        minWidth: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: BreakPointBetween_xs_sm
            ? "column"
            : BreakPointBetween_sm_md
            ? "column"
            : BreakPointBetween_md_lg
            ? "column"
            : "row",
          marginBottom: "2%",
          bgcolor: "",
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            padding: "1% 1% 0% 1%",
            width: BreakPointBetween_xs_sm
              ? "100%"
              : BreakPointBetween_sm_md
              ? "100%"
              : BreakPointBetween_md_lg
              ? "100%"
              : "20%",
          }}
        >
          <Box
            sx={{
              height: BreakPoint_lg ? "100%" : "auto",
              display: "flex",
              flexDirection: BreakPointBetween_xs_sm
                ? "row"
                : BreakPointBetween_sm_md
                ? "row"
                : BreakPointBetween_md_lg
                ? "row"
                : "column",
              gap: BreakPointBetween_lg_xl ? "0rem" : "0.6rem",
              alignItems: "center",
              justifyContent:
                BreakPointBetween_lg_xl || BreakPoint_lg ? "center" : "",
            }}
          >
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography sx={{ fontSize: "34px", fontWeight: "700" }}>
                {"4.5"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  lineHeight: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Out of
                <br /> 5 Stars
              </Typography>
            </Box>
            <Rating
              value={5}
              readOnly
              size={
                BreakPointBetween_xs_sm
                  ? "small"
                  : BreakPointBetween_sm_md
                  ? "medium"
                  : BreakPointBetween_md_lg
                  ? "medium"
                  : "large"
              }
            />
            {BreakPoint_lg ? (
              <Typography
                sx={{ fontWeight: "600", marginTop: "0px", fontSize: "15px" }}
              >
                Based on 1020 reviews
              </Typography>
            ) : (
              ""
            )}
          </Box>
          {BreakPointBetween_lg_xl || BreakPoint_lg ? (
            ""
          ) : (
            <Typography
              sx={{ fontWeight: "600", marginTop: "-6px", fontSize: "14px" }}
            >
              Based on 1020 reviews
            </Typography>
          )}
        </Box>
        {BreakPointBetween_xs_sm ||
        BreakPointBetween_sm_md ||
        BreakPointBetween_md_lg ? (
          ""
        ) : (
          <Divider
            orientation={
              BreakPointBetween_xs_sm
                ? "horizontal"
                : BreakPointBetween_sm_md
                ? "horizontal"
                : BreakPointBetween_md_lg
                ? "horizontal"
                : "vertical"
            }
            flexItem
          />
        )}
        <Box
          sx={{
            padding: "1%",
            width: BreakPointBetween_xs_sm
              ? "100%"
              : BreakPointBetween_sm_md
              ? "100%"
              : BreakPointBetween_md_lg
              ? "100%"
              : "80%",
          }}
        >
          {score.map((score,index) => (
            <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
              <Rating
                value={score.rate}
                readOnly
                size={
                  BreakPointBetween_xs_sm
                    ? "small"
                    : BreakPointBetween_sm_md
                    ? "small"
                    : BreakPointBetween_md_lg
                    ? "medium"
                    : "large"
                }
              />
              <BorderLinearProgress variant="determinate" value={score.count} />
              <Typography
                sx={{ fontWeight: "600", marginRight: "1%", fontSize: "14px" }}
              >{`${(100 * score.count) / 100}%`}</Typography>
              <Typography
                sx={{ fontWeight: "600", fontSize: "14px" }}
              >{`(${score.count})`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Divider />

      {/*---------------------------Review Part----------------------------------------------*/}
      <ReviewContent />

      <Divider />
    </Box>
  );
}
