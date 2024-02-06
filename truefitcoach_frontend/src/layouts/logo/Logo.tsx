import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { bool, boolean } from "yup";

type LogoProps = {
  isTrainerMode: boolean;
};

export default function Logo({ isTrainerMode }: LogoProps) {
  const BaseDeviceLogo = () => {
    return (
      <Box>
        <Link
          href={isTrainerMode ? "/trainer_mode/trainer_home" : "/"}
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              userSelect: "none",
              msUserSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            TrueFitCoach
          </Typography>
        </Link>
      </Box>
    );
  };

  const SmallDeviceLogo = () => {
    return (
      <Box>
        <Link href={"/"} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              // border: "solid 3px",
              // borderRadius: "50%",
              fontSize: "24px",
              fontWeight: "bold",
              width: "55px",
              height: "55px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              userSelect: "none",
              msUserSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            TrueFitCoach
          </Typography>
        </Link>
      </Box>
    );
  };

  const theme = useTheme();
  let logo;
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

  switch (true) {
    case BreakPointBetween_xs_sm:
      logo = SmallDeviceLogo();
      break;
    case BreakPointBetween_sm_md:
      logo = SmallDeviceLogo();
      break;
    case BreakPointBetween_md_lg:
      logo = SmallDeviceLogo();
      break;
    case BreakPointBetween_lg_xl:
      logo = BaseDeviceLogo();
      break;
    case BreakPointUp_xl:
      logo = BaseDeviceLogo();
      break;
    default:
      logo = <Box>LOGO!</Box>;
      break;
  }

  return <Box>{logo}</Box>;
}
