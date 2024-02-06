import authConfig from "src/configs/auth";

export const GET_USER_ENDPOINT =
  process.env.NEXT_PUBLIC_ENDPOINT + authConfig.userEndpoint;

export const GET_NEW_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_ENDPOINT + authConfig.refreshEndpoint;

  export const GET_TRAINER_ENDPOINT =
  process.env.NEXT_PUBLIC_ENDPOINT + '/trainer/get-trainer';
