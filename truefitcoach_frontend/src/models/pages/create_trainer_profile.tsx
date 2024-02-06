import {
  Control,
  UseFormWatch,
  UseFormHandleSubmit,
  UseFormGetValues,
  FieldErrors,
} from "react-hook-form";

export type trainerRegisterTypes = {
  firstName: string;
  lastName: string;
  nickname: string;
  phone_number: string;
  email: string;
};

export interface TrainerRegisterPropsType {
  loading: boolean;
  watch: UseFormWatch<trainerRegisterTypes>;
  accept: boolean;
  setAccept: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FieldErrors<trainerRegisterTypes>;
  control: Control<trainerRegisterTypes>; // Add the control prop if needed
  handleSubmit: UseFormHandleSubmit<trainerRegisterTypes>; // Pass the handleSubmit prop
  onSubmit: (data: trainerRegisterTypes) => void; // Pass the onSubmit prop
}
