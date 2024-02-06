import { ReactNode } from "react";
import NavigateToItemModel from "@/models/navigation/NavigationItem";
import Navigation from "./appBar/content/navigation/NavigationLayout";
import React from "react";
import LayoutAppBar from "./appBar/LayoutAppBar";
import Box from "@mui/material/Box";
import TrainerNavigateItemModel from "@/models/navigation/TrainerNavigationItem";

type HorizontalLayoutProps = {
  horizontalNavItems: NavigateToItemModel[];
  horizontalAppBarLogo: ReactNode;
  horizontalAppBarSignIn: ReactNode;
  horizontalAppBarSignUp: ReactNode;
  isTrainerMode: boolean;
  handleTrainerModeClick: () => void;
  TrainerNavigations: TrainerNavigateItemModel[];
};

export default function AppBar({
  horizontalAppBarSignIn,
  horizontalAppBarSignUp,
  horizontalNavItems,
  horizontalAppBarLogo,
  isTrainerMode,
  handleTrainerModeClick,
  TrainerNavigations,
}: HorizontalLayoutProps) {
  return (
    <Box>
      <LayoutAppBar
        isTrainerMode={isTrainerMode}
        handleTrainerModeClick={handleTrainerModeClick}
        horizontalAppBarLogo={horizontalAppBarLogo}
        horizontalAppBarSignIn={horizontalAppBarSignIn}
        horizontalAppBarSignUp={horizontalAppBarSignUp}
      >
        <Navigation
          isTrainerMode={isTrainerMode}
          TrainerNavigations={TrainerNavigations}
          horizontalNavItems={horizontalNavItems}
        />
      </LayoutAppBar>
    </Box>
  );
}
