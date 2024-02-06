import {
  Control,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormSetError,
} from "react-hook-form";

export type SignInType = {
  email: string;
  password: string;
};

export interface LoginPropsType {
  rememberMe: boolean;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FieldErrors<SignInType>;
  control: Control<SignInType>; // Add the control prop if needed
  handleSubmit: UseFormHandleSubmit<SignInType>; // Pass the handleSubmit prop
  onSubmit: (data: SignInType) => void; // Pass the onSubmit prop
}
