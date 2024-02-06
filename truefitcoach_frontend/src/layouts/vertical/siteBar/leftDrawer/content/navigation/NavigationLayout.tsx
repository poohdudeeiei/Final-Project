import NavigateToItemModel from "@/models/navigation/NavigationItem";
import LeftDrawerNavItems from "./NavigationItem";
import Box from "@mui/system/Box";

type NavigationLayoutProps = {
  LeftDrawerNavigations: NavigateToItemModel[];
};

export default function NavigationLayout({
  LeftDrawerNavigations,
}: NavigationLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <LeftDrawerNavItems
        LeftDrawerNavigations={LeftDrawerNavigations}
      ></LeftDrawerNavItems>
    </Box>
  );
}
