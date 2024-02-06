import UserMenuItemModel from "@/models/navigation/UserMenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useAuth } from "@/้hooks/useAuth";
export default function UserMenu(): UserMenuItemModel[] {

  const auth = useAuth()

  return [
    {
      title: "Edit Profile",
      path: "/user_menu/edit_profile",
      icon: <EditIcon></EditIcon>,
    },
    {
      title: "View Bookmarks",
      path: "/user_menu/view_bookmarks",
      icon: <BookmarkIcon></BookmarkIcon>,
    },
    {
      title: "View Block Users",
      path: "/user_menu/view_block_users",
      icon: <PersonOffIcon></PersonOffIcon>,
    },
    {
      title: "Setting & Privacy",
      path: "/user_menu/setting_privacy",
      icon: <SettingsIcon></SettingsIcon>,
    },
    {
      title: "Logout",
      // path: "",
      icon: <LogoutIcon></LogoutIcon>,
      onClick: () => auth.logout(),
    },
  ];
}
