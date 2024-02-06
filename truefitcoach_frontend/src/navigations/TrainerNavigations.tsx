import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import TrainerNavigateItemModel from "@/models/navigation/TrainerNavigationItem";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

export default function TrainerNavigations(): TrainerNavigateItemModel[] {
  const theme = useTheme();
  const BreakPointBetween_xs_sm = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );

  return [
    {
      title: "Home",
      path: "/trainer_mode/trainer_home",
      icon: (
        <HomeIcon
          sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
        ></HomeIcon>
      ),
    },
    {
      title: "Training Management",
      path: "/trainer_mode/training_management",
      icon: (
        <EditCalendarIcon
          sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
        ></EditCalendarIcon>
      ),
    },
    {
      title: "Course Management",
      path: "/trainer_mode/course_management",
      icon: (
        <NoteAltIcon
          sx={{ fontSize: BreakPointBetween_xs_sm ? "20px" : "24px" }}
        ></NoteAltIcon>
      ),
    },
  ];
}
