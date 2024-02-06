import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Link from "next/link";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Divider } from "@mui/material";

export default function ServiceContent() {
  const theme = useTheme();
  const BreakPointBetween_md_lg = useMediaQuery(
    theme.breakpoints.between("md", "lg")
  );
  const BreakPointBetween_lg_xl = useMediaQuery(
    theme.breakpoints.between("lg", "xl")
  );
  const BreakPointDown_md = useMediaQuery(theme.breakpoints.down("md"));
  const BreakPointDown_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BreakPointDown_lg = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        marginRight: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: BreakPointDown_md
          ? "center"
          : BreakPointDown_lg
          ? "center"
          : BreakPointBetween_lg_xl
          ? "center"
          : "flex-start",
        gap: "5px",
        userSelect: "none",
        msUserSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {BreakPointDown_md ? (
        <Box>
          <Typography
            sx={{
              fontSize: "60px",
              lineHeight: "1.2",
              fontWeight: "800",
            }}
          >
            FIND
          </Typography>
          <Typography
            sx={{
              marginLeft: "30px",
              fontSize: "60px",
              lineHeight: "1.2",
              fontWeight: "800",
            }}
          >
            YOUR
          </Typography>
          <Typography
            sx={{
              marginLeft: "60px",
              fontSize: "58px",
              lineHeight: "1.2",
              fontWeight: "800",
            }}
          >
            TRAINER!
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography
            sx={{
              fontSize: BreakPointBetween_md_lg ? "58px" : "62px",
              fontWeight: "800",
            }}
          >
            FIND YOUR TRAINER!
          </Typography>
        </Box>
      )}

      <Box>
        {BreakPointDown_md && (
          <Divider
            sx={{ color: "black", borderWidth: "1px", marginBottom: "10px" }}
          ></Divider>
        )}
        <Typography
          sx={{
            fontSize: BreakPointDown_md
              ? "14px"
              : BreakPointBetween_md_lg
              ? "16px"
              : "18px",
            fontWeight: "600",
            textAlign: BreakPointDown_md
              ? "center"
              : BreakPointDown_lg
              ? "center"
              : BreakPointBetween_lg_xl
              ? "center"
              : "flex-start",
            lineHeight: "1.8",
          }}
        >
          This website is a resource for creating trainer profiles and a{" "}
          {!BreakPointDown_sm && <br></br>}
          system for recognizing and managing training between clients and
          trainers.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", marginTop: "20px" }}>
        <Link href={"/setup/find_trainers"} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              height: "fit-content",
              padding: "12px 24px",
              bgcolor: "#1a1a1a",
              cursor: "pointer",
              borderRadius: "5px",
              textTransform: "none",
              color: "black",
              ":hover": {
                bgcolor: "rgb(0,0,0,0.7)",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: BreakPointDown_md
                  ? "14px"
                  : BreakPointBetween_md_lg
                  ? "18px"
                  : "20px",
                fontWeight: "600",
                textAlign: "center",
                color: "white",
              }}
            >
              Find Trainer
            </Typography>
          </Button>
        </Link>

        <Link
          href={"/setup/create_trainer_profile"}
          style={{ textDecoration: "none" }}
        >
          <Button
            sx={{
              marginLeft: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              height: "fit-content",
              padding: "12px 24px",
              bgcolor: "#1a1a1a",
              cursor: "pointer",
              borderRadius: "5px",
              textTransform: "none",
              color: "black",
              ":hover": {
                bgcolor: "rgb(0,0,0,0.7)",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: BreakPointDown_md
                  ? "14px"
                  : BreakPointBetween_md_lg
                  ? "18px"
                  : "20px",
                fontWeight: "600",
                textAlign: "center",
                color: "white",
              }}
            >
              Create Trainer Profile
            </Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
