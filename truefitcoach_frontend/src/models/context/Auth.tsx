import { SignInType } from "../pages/SignIn";
import { ReactNode } from "react";
import { UseFormSetError } from "react-hook-form";

export type UserProps = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  profile_image: string;
  trainerId?: string;
};

export type TrainerProps = {
  trainer_email: string;
  trainer_first_name: string;
  trainer_last_name: string;
  nickname: string;
  phone_number: string;
  facebook_url: string;
  instagram_url: string;
};

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
  setError?: UseFormSetError<SignInType>;
  errorCallback?: (error: any) => void;
};

export type AuthValuesType = {
  loading: boolean;
  isTrainer: boolean | null;
  token: string | null;
  logout: () => void;
  setTrainerMode: () => void;
  user: UserProps | null;
  trainer: TrainerProps | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserProps | null) => void;
  setTrainer: (value: TrainerProps | null) => void;
  login: (params: LoginParams) => void;
};

export type TrainerValuesType = {
  loading: boolean;
  trainer: TrainerProps | null;
  setLoading: (value: boolean) => void;
  setTrainer: (value: TrainerProps | null) => void;
};

export interface AuthContextProps {
  children: ReactNode;
}

export interface TrainerAuthContextProps {
  children: ReactNode;
}
