import NavigateToItemModel from "@/models/navigation/NavigationItem";
import HorizontalNavItems from "./NavigationItem";
import Box from "@mui/system/Box";
import TrainerNavigateItemModel from "@/models/navigation/TrainerNavigationItem";

type NavigationProps = {
  horizontalNavItems: NavigateToItemModel[];
  isTrainerMode: boolean;
  TrainerNavigations: TrainerNavigateItemModel[];
};

export default function NavigationLayout({
  horizontalNavItems,
  isTrainerMode,
  TrainerNavigations,
}: NavigationProps) {

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <HorizontalNavItems
        isTrainerMode={isTrainerMode}
        TrainerNavigations={TrainerNavigations}
        horizontalNavItems={horizontalNavItems}
      ></HorizontalNavItems>
    </Box>
  );
}
