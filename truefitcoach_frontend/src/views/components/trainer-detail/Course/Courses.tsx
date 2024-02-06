import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardCourse from "./CardCouse";

export default function Courses() {
  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <CardCourse />
          </Grid>
          {/* <Grid item xs={12} md={6} sm={12}>
            <CardCourse />
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}
