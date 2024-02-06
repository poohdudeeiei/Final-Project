import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import Link from "next/link";

export default function SignIn() {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const primaryDarkColor = theme.palette.primary.dark;
  const secondaryMainColor = theme.palette.secondary.main;
  const secondaryLightColor = theme.palette.secondary.light;
  const secondaryDarkColor = theme.palette.secondary.dark;
  
  return (
    <Link href={"/auth/signIn"} style={{ textDecoration: "none" }}>
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "16px",
          color: "white",
          "&:hover": {
            color: primaryMainColor,
          },
        }}
      >
        Sign in
      </Typography>
    </Link>
  );
}
