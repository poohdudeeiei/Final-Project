import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import Link from "next/link";

export default function SignUp() {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;
  
  return (
    <Link href={"/auth/signUp"} style={{ textDecoration: "none" }}>
      <Typography
        sx={{
          border: "1px solid white",
          padding: "5px 10px 5px 10px",
          fontWeight: "500",
          fontSize: "16px",
          color: "white",
          "&:hover": {
            color: primaryMainColor,
            border: "1px solid " + primaryMainColor,
          },
        }}
      >
        Sign up
      </Typography>
    </Link>
  );
}
