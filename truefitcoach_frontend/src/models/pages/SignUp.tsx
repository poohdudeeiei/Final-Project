import { Control, UseFormHandleSubmit, FieldErrors } from "react-hook-form";

export type RegisterType = {
  firstName: string;
  lastName: string;
  username:string;
  email: string;
  password: string;
  confirmPassword: string;
};

export enum FieldValues {
  username = 'username',
  email = "email",
};


export interface SignUpPropsType {
  accept: boolean;
  setAccept: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FieldErrors<RegisterType>;
  control: Control<RegisterType>; // Add the control prop if needed
  handleSubmit: UseFormHandleSubmit<RegisterType>; // Pass the handleSubmit prop
  onSubmit: (data: RegisterType) => void; // Pass the onSubmit prop
}
