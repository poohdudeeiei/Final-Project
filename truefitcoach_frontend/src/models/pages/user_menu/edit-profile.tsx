import {
  Control,
  UseFormWatch,
  UseFormHandleSubmit,
  UseFormReset,
  FieldErrors,
} from "react-hook-form";

export type FormPersonalProps = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birthDate: Date;
  gender: string;
  congenitalDisease: string;
};

export interface TrainerHistoryPropsType {
  errors: FieldErrors<FormPersonalProps>;
  control: Control<FormPersonalProps>; // Add the control prop if needed
  handleSubmit: UseFormHandleSubmit<FormPersonalProps>; // Pass the handleSubmit prop
  onSubmit: (data: FormPersonalProps) => void;
  reset: UseFormReset<FormPersonalProps>;
}

export interface FormImageProfileProps {
  open: boolean;
  image_path: string;
  data: any;
  onClosePopup: () => void;
  photo: File | null;
  onImageSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  imageLoading: boolean;
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
