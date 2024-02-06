import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import Box from "@mui/system/Box";

interface ListCustomersDetail {
  customer?: number;
}
export default function ListCustomersDetail({ customer }: ListCustomersDetail) {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "64px",
      }}
    >
      <Grid
        item
        xs={4.5}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Box>
          <AccountCircleRoundedIcon
            sx={{ fontSize: "64px" }}
          ></AccountCircleRoundedIcon>
        </Box>

        <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
          Customer Name
        </Typography>

        <Divider orientation="vertical" sx={{ height: "80%" }}></Divider>
      </Grid>

      <Grid
        item
        xs={4.5}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          gap: "35px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>Course Number</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
            Course 1
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>Time Remaining</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
            2 Weeks
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80px",
            height: "30px",
            borderRadius: "10px",
            bgcolor: primaryDarkColor,
            transition: "0.2s",
            "&:hover": {
              bgcolor: primaryMainColor,
            },
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "10px",
              fontWeight: "500",
            }}
          >
            VIEW PROFILE
          </Typography>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80px",
            height: "30px",
            borderRadius: "10px",
            bgcolor: primaryDarkColor,
            transition: "0.2s",
            "&:hover": {
              bgcolor: "#F03A47",
            },
          }}
        >
          <Typography
            sx={{ color: "white", fontSize: "10px", fontWeight: "500" }}
          >
            END COURSE
          </Typography>
        </Box>
      </Grid>
      {/* <Divider orientation="vertical" sx={{ height: "80%" }}></Divider> */}
    </Grid>
  );
}
