import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/system/Box";

export default function ContactIcon() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          gap: "20px",
        }}
      >
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon
            sx={{
              fontSize: "35px",
              color: "black",
              ":hover": {
                bgcolor: "rgb(0,0,0,0.15)",
                borderRadius: "5px",
                padding: "2px",
              },
            }}
          ></FacebookIcon>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon
            sx={{
              fontSize: "35px",
              color: "black",
              ":hover": {
                bgcolor: "rgb(0,0,0,0.15)",
                borderRadius: "5px",
                padding: "2px",
              },
            }}
          ></InstagramIcon>
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon
            sx={{
              fontSize: "35px",
              color: "black",
              ":hover": {
                bgcolor: "rgb(0,0,0,0.15)",
                borderRadius: "5px",
                padding: "2px",
              },
            }}
          ></TwitterIcon>
        </a>
      </Box>
    </Box>
  );
}
