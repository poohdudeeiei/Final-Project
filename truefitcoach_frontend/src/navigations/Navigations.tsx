import NavigateToItem from "../models/navigation/NavigationItem";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SearchIcon from "@mui/icons-material/Search";
import PermContactCalendarSharpIcon from "@mui/icons-material/PermContactCalendarSharp";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";

export default function Navigations(): NavigateToItem[] {
  const theme = useTheme();
  const BreakPointBetween_xs_sm = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );

  return [
    {
      title: "Home",
      path: "/",
      icon: (
        <HomeIcon
          sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
        ></HomeIcon>
      ),
    },
    {
      title: "Service",
      path: "/setup/service",
      icon: (
        <FitnessCenterIcon
          sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
        ></FitnessCenterIcon>
      ),
      child: [
        {
          subtitle: "Find courses",
          subpath: "/setup/find_courses",
          subicon: (
            <SearchIcon
              sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
            ></SearchIcon>
          ),
        },
        {
          subtitle: "Find trainers",
          subpath: "/setup/find_trainers",
          subicon: (
            <SearchIcon
              sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
            ></SearchIcon>
          ),
        },
        {
          subtitle: "Create trainer profile",
          subpath: "/setup/create_trainer_profile",
          subicon: (
            <PermContactCalendarSharpIcon
              sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
            ></PermContactCalendarSharpIcon>
          ),
        },
      ],
    },
    {
      title: "Help",
      path: "/setup/help",
      icon: (
        <HelpIcon
          sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
        ></HelpIcon>
      ),
    },
    {
      title: "About us",
      path: "/setup/about_us",
      icon: (
        <InfoIcon
          sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
        ></InfoIcon>
      ),
    },
  ];
}
