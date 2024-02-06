import { Control, UseFormHandleSubmit } from "react-hook-form";

export type findForm = {
  keyword: string;
  province: string;
  district: string;
  shortcutFilter: string;
};

export interface BottomDrawerProps {
  isDrawerOpen: boolean;
  handleDrawerClose: () => void;
  control: Control<findForm>; // Add the control prop if needed
  handleSubmit: UseFormHandleSubmit<findForm>; // Pass the handleSubmit prop
  onSubmit: (data: findForm) => void; // Pass the onSubmit prop
}

export type TrainerDetailType = {
  nickname: string;
  firstName: string;
  lastName: string;
  experience: string;
  expertise: string;
  qualification: string;
  teachingStyle: string;
  location: String;
};
