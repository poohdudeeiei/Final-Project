const jwt = require("jsonwebtoken");
const User = require("../../model/user");

type UserType = {
  _id: String;
  email: String;
};

export const jwtAccessTokenGenerate = (user: UserType, expiration: string) => {
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION, algorithm: "HS256" }
  );

  return accessToken;
};

export const jwtRefreshTokenGenerate = (user: UserType, expiration: string) => {
  const refreshToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION, algorithm: "HS256" }
  );

  return refreshToken;
};

export const encodedAccessToken = async (accessToken: string) => {
  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
    algorithms: ["HS256"],
  });
  return decoded;
};

export const encodedRefreshToken = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, {
    algorithms: ["HS256"],
  });
  return decoded;
};

export const validateCurrentRefreshToken = async (refreshToken: string) => {
  try {
    const decoded = await encodedRefreshToken(refreshToken);

    const existToken = await User.findOne({
      _id: decoded._id,
      refreshToken: refreshToken,
    });

    if (!existToken) {
      console.log("Token isn't exist, Cant find in DB");
      return;
    }

    if (existToken.refreshToken !== refreshToken) {
      console.log("!equal");
      return;
    }

    return decoded;
  } catch (err) {
    console.error("Refresh Token Error:", err);
  }
};
