import { Divider, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";
import { BsLine } from "react-icons/bs";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function OwnTrainerInfo() {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        height: "100%",
        gap: "10px",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "14px", width: "30%" }}>
          First Name:
        </Typography>
        <Typography sx={{ fontWeight: "200", fontSize: "14px" }}>
          YourFirstName
        </Typography>
      </Box>

      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "14px", width: "30%" }}>
          Last Name:
        </Typography>
        <Typography sx={{ fontWeight: "200", fontSize: "14px" }}>
          YourLastName
        </Typography>
      </Box>

      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "14px", width: "30%" }}>
          Email:
        </Typography>
        <Typography sx={{ fontWeight: "200", fontSize: "14px" }}>
          YourEmail@hotmail.com
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: "black" }}></Divider>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ display: "flex", width: "50%" }}>
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", width: "42%" }}
          >
            Telephone:
          </Typography>
          <Typography sx={{ fontWeight: "200", fontSize: "12px" }}>
            099-999-9999
          </Typography>
        </Box>
        <Box sx={{ display: "flex", width: "50%" }}>
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", width: "50%" }}
          >
            Province:
          </Typography>
          <Typography sx={{ fontWeight: "200", fontSize: "12px" }}>
            YourProvince
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ display: "flex", width: "50%" }}>
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", width: "42%" }}
          >
            District:
          </Typography>
          <Typography sx={{ fontWeight: "200", fontSize: "12px" }}>
            YourDistrict
          </Typography>
        </Box>

        <Box sx={{ display: "flex", width: "50%" }}>
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", width: "50%" }}
          >
            Sub District:
          </Typography>
          <Typography sx={{ fontWeight: "200", fontSize: "12px" }}>
            YourSubDistrict
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ bgcolor: "black" }}></Divider>

      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginTop: "5px",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", width: "60%" }}>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              width: "60%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <BsLine fontSize={"24px"} cursor={"pointer"}></BsLine>
              </Box>
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                :
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "200" }}>
                YourLineID
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <InstagramIcon
                sx={{ fontSize: "24px", cursor: "pointer" }}
              ></InstagramIcon>
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                :
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "200" }}>
                YourInstagramName
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <FacebookIcon
                sx={{ fontSize: "24px", cursor: "pointer" }}
              ></FacebookIcon>
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                :
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "200" }}>
                YourFacebookName
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "5%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Divider orientation="vertical" sx={{ height: "100%" }}></Divider> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "35%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgb(36, 36, 36)",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "0.5s",
              "&:hover": {
                bgcolor: primaryMainColor,
              },
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "700", color: "white" }}
            >
              Edit
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgb(36, 36, 36)",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "0.5s",
              "&:hover": {
                bgcolor: "#F03A47",
              },
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "700", color: "white" }}
            >
              Delete
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
