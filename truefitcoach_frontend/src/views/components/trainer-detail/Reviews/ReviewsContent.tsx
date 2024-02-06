import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import TrainerPhoto from "../../../../../public/trainer-in-fitness-male3.png";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { deepOrange } from "@mui/material/colors";
import { styled, useTheme } from "@mui/system";
import { Paper, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

export const ReviewContent = () => {
  let contentRender;
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
  const BreakPointUp_xl = useMediaQuery(theme.breakpoints.up("xl"));

  const RenderHomeForSmallDevices = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1.5% 1% 1.5% 1%",
          gap: "30px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 40, height: 40 }}>
              P
            </Avatar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Rating readOnly value={5} size="small" />
                <Typography sx={{ fontSize: "12px" }}>09/12/2022</Typography>
                {/* <Typography sx={{ fontWeight: "600" }}>about</Typography>
                <Typography sx={{ color: "red" }}>
                  Exercise reduce fat
                </Typography> */}
              </Box>

              <Typography sx={{ fontSize: "12px" }}>Dechanuphap Anuwan </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
                  about
                </Typography>
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  Exercise reduce fat
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "650", fontSize: "16px" }}>
              {/* header */}
              This course is amazing
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
            Detail Comment
            </Typography>
          </Box>
          {true ? (
            <Box sx={{ display: "flex", gap: "12px" }}>
              <Image
                src={TrainerPhoto}
                alt="eiei"
                width={300}
                height={300}
                style={{ width: "30%", height: "auto" }}
              />
              <Image
                src={TrainerPhoto}
                alt="eiei"
                width={300}
                height={300}
                style={{ width: "30%", height: "auto" }}
              />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    );
  };

  const RenderHomeForMediumDevices = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1.5% 1% 1.5% 1%",
          gap: "30px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 60, height: 60 }}>
              E
            </Avatar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <Rating readOnly value={5} />
                <Typography>09/12/2022</Typography>
                <Typography sx={{ fontWeight: "600" }}>about</Typography>
                <Typography sx={{ color: "red" }}>
                  Exercise reduce fat
                </Typography>
              </Box>
              <Typography>Dechanuphap Anuwan</Typography>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "650" }}>
              This course is amazing
            </Typography>
            <Typography>
            Detail Comment
            </Typography>
          </Box>
          {true ? (
            <Image src={TrainerPhoto} alt="eiei" width={300} height={300} />
          ) : (
            ""
          )}
        </Box>
      </Box>
    );
  };
  const RenderHomeForBaseDevices = () => {
    contentRender = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1.5% 1% 1.5% 1%",
          gap: "30px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 60, height: 60 }}>
              E
            </Avatar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <Rating readOnly value={5} />
                <Typography>09/12/2022</Typography>
                <Typography sx={{ fontWeight: "600" }}>about</Typography>
                <Typography sx={{ color: "red" }}>
                  Exercise reduce fat
                </Typography>
              </Box>
              <Typography>Dechanuphap Anuwan</Typography>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "650" }}>
              This course is amazing
            </Typography>
            <Typography>
              Detail Comment
            </Typography>
          </Box>
          {true ? (
            <Image src={TrainerPhoto} alt="eiei" width={300} height={300} />
          ) : (
            ""
          )}
        </Box>
      </Box>
    );
  };

  switch (true) {
    case BreakPointBetween_xs_sm:
      RenderHomeForSmallDevices();
      break;
    case BreakPointBetween_sm_md:
      RenderHomeForSmallDevices();
      break;
    case BreakPointBetween_md_lg:
      RenderHomeForMediumDevices();
      break;
    case BreakPointBetween_lg_xl:
      RenderHomeForBaseDevices();
      break;
    case BreakPointUp_xl:
      RenderHomeForBaseDevices();
      break;
    default:
      contentRender = <Box>Home Page!</Box>;
      break;
  }

  return <>{contentRender}</>;
};
