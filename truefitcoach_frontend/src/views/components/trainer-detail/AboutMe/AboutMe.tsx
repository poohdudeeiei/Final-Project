import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import TrainerPhoto from "../../../../../public/trainer-in-fitness-male3.png";
import styled from "@mui/system/styled";
import { useTheme } from "@mui/system";
import { Paper, useMediaQuery } from "@mui/material";

const GridStyle = styled(Grid)({
  color: "black",
  backgroundColor: "",
  display: "flex",
  padding: "1%",
});

export default function AboutMe() {
  const theme = useTheme();
  const BreakPointBetween_sm_md = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  const BreakPointBetween_md_lg = useMediaQuery(
    theme.breakpoints.between("md", "lg")
  );
  const BreakPointBetween_lg_xl = useMediaQuery(
    theme.breakpoints.between("lg", "xl")
  );

  return (
    <Box
      sx={{
        bgcolor: "#BCBCBC",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ padding: "5px" }}>
        <Grid container spacing={0}>
          <GridStyle
            item
            lg={7}
            md={12}
            sm={12}
            sx={
              {
                // flexDirection: BreakPointBetween_sm_md ? "column" : "row", // Conditionally set flexDirection
              }
            }
          >
            <Image
              src={TrainerPhoto}
              alt="eiei"
              width={500}
              height={500}
              style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
            />
            {/* <Typography>eiei</Typography> */}
          </GridStyle>
          <GridStyle
            item
            lg={5}
            md={12}
            sm={12}
            sx={{
              // justifyContent: "center",
              bgcolor: "",
              flexDirection: "column",
              gap: BreakPointBetween_lg_xl ? "1.5rem" : "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
              I'm a trainer from TrueFitCoach
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "400",textIndent: "5%", }}>
              This is content about trainer that specify detail about him/her
              that everyone interest in
            </Typography>
          </GridStyle>
        </Grid>
      </Box>
    </Box>
  );
}
