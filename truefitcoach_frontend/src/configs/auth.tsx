export default {
  userEndpoint: "/user",
  loginEndpoint: "/auth/login",
  refreshEndpoint: "/auth/refresh",
  registerEndpoint: "/auth/register",
  storageTokenKeyName: "accessToken",
  onTokenExpiration: "refreshToken", // logout | refreshToken
};
