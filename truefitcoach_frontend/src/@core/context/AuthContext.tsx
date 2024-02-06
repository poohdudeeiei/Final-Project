import { createContext, useEffect, useState } from "react";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import authConfig from "src/configs/auth";
import {
  AuthValuesType,
  AuthContextProps,
  LoginParams,
} from "@/models/context/Auth";
import {
  GET_USER_ENDPOINT,
  GET_NEW_ACCESS_TOKEN,
  GET_TRAINER_ENDPOINT,
} from "@/services/endpoint/auth";
import jwt_decode from "jwt-decode";
import AuthStatus from "@/views/components/Authentication/pop-up/authStatus";

const defaultProvider: AuthValuesType = {
  user: null,
  isTrainer: null,
  token: "",
  loading: false,
  setUser: () => {},
  setLoading: () => Boolean,
  trainer: null,
  setTrainer: () => {},
  setTrainerMode: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: AuthContextProps) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [trainer, setTrainer] = useState(defaultProvider.trainer);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [token, setAccess] = useState(defaultProvider.token);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isTrainer, setIsTrainer] = useState(defaultProvider.isTrainer);

  // ** Hooks
  const router = useRouter();

  let localAccessToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem(authConfig.storageTokenKeyName)
      : null;

  let localRefreshToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem(authConfig.onTokenExpiration)
      : null;

  //Function checking Token every time using
  const initAuth = async () => {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    );
    if (storedToken) {
      const token = storedToken.replace(/"/g, "");

      setLoading(true);
      setAccess(token);
      await axios
        .get(GET_USER_ENDPOINT, {
          headers: {
            Authorization: token,
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            // console.log(response);
            setUser({ ...response.data.userData });
            setLoading(false);
            if (response?.data?.userData?.trainerId) {
              try {
                const result = await axios.get(GET_TRAINER_ENDPOINT, {
                  headers: {
                    Authorization: token,
                  },
                });

                if (result.status === 200) {
                  setTrainer(result.data.trainer);
                  setLoading(false);
                  setIsTrainer(true);
                }
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  console.error(error);
                }
                console.error(error);
              }
            } else {
              setIsTrainer(false);
            }

            if (router.query && router.query.returnUrl) {
              const returnUrl = Array.isArray(router.query.returnUrl)
                ? router.query.returnUrl[0]
                : router.query.returnUrl;

              router.push(returnUrl);
            }
          } else {
            console.log("No");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem(authConfig.storageTokenKeyName);
          localStorage.removeItem(authConfig.onTokenExpiration);
          setUser(null);
          setLoading(false);
          router.replace(authConfig.loginEndpoint);
        });
    } else {
      console.log("No data");
      setLoading(false);
    }
  };

  const checkTokenExpiration = async () => {
    if (localAccessToken && localRefreshToken) {
      const decodedAccessToken: any = await jwt_decode(localAccessToken);
      const decodedRefreshToken: any = await jwt_decode(localRefreshToken);

      const currentTime = Date.now() / 1000; // Convert to seconds

      console.log(new Date().toLocaleString());
      console.log(
        "Token Access expires at:",
        new Date(decodedAccessToken.exp * 1000).toLocaleString()
      );
      console.log(
        "Token Refresh expires at:",
        new Date(decodedRefreshToken.exp * 1000).toLocaleString()
      );

      if (decodedAccessToken.exp && decodedAccessToken.exp < currentTime) {
        if (decodedRefreshToken.exp && decodedRefreshToken.exp > currentTime) {
          const reToken = localRefreshToken.replace(/"/g, "");

          try {
            const response = await axios.get(GET_NEW_ACCESS_TOKEN, {
              headers: {
                Authorization: reToken,
              },
            });

            if (response.status === 200) {
              localStorage.setItem(
                authConfig.storageTokenKeyName,
                JSON.stringify(response.data.accessToken)
              );
              localStorage.setItem(
                authConfig.onTokenExpiration,
                JSON.stringify(response.data.refreshToken)
              );
              setAccess(response.data.accessToken);

              // Call initAuth after updating tokens
              return initAuth();
            } else {
              console.log("No");
            }
          } catch (err) {
            console.log(err);
            localStorage.removeItem(authConfig.storageTokenKeyName);
            localStorage.removeItem(authConfig.onTokenExpiration);
            setUser(null);
          }
        } else {
          setIsTokenExpired(true);
          setUser(null);
          localStorage.removeItem(authConfig.storageTokenKeyName);
          localStorage.removeItem(authConfig.onTokenExpiration);
          console.log("Token has expired with refresh expired");
        }
      } else {
        initAuth();
      }
    }
  };

  // useEffect(() => {
  //   setCountRender((prevCount) => prevCount + 1);
  // }, []);

  useEffect(() => {
    const getAuth = async () => {
      if (localAccessToken && localRefreshToken) {
        const decodedAccessToken: any = await jwt_decode(localAccessToken);
        const decodedRefreshToken: any = await jwt_decode(localRefreshToken);

        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedAccessToken.exp && decodedAccessToken.exp < currentTime) {
          if (
            decodedRefreshToken.exp &&
            decodedRefreshToken.exp > currentTime
          ) {
            setLoading(true);
            const reToken = localRefreshToken.replace(/"/g, "");
            try {
              const getUser = await axios.get(GET_NEW_ACCESS_TOKEN, {
                headers: { Authorization: reToken },
              });
              if (getUser.status === 200) {
                localAccessToken = getUser.data.accessToken;
                localRefreshToken = getUser.data.refreshToken;
                localStorage.setItem(
                  authConfig.storageTokenKeyName,
                  JSON.stringify(localAccessToken)
                );
                localStorage.setItem(
                  authConfig.onTokenExpiration,
                  JSON.stringify(localRefreshToken)
                );
                setAccess(getUser.data.accessToken);
                setLoading(false);
                console.log("Refresh");
                return initAuth();
              }
            } catch (err) {
              console.log(err);
              localStorage.removeItem(authConfig.storageTokenKeyName);
              localStorage.removeItem(authConfig.onTokenExpiration);
              setUser(null);
              setLoading(false);
            }
          } else {
            setIsTokenExpired(true);
            setUser(null);
            localStorage.removeItem(authConfig.storageTokenKeyName);
            localStorage.removeItem(authConfig.onTokenExpiration);
            console.log("Token has expired with refresh expired");
            setLoading(false);
          }
        } else if (
          decodedAccessToken.exp &&
          decodedAccessToken.exp > currentTime
        ) {
          setLoading(true);
          await initAuth();
          setLoading(false);
        }
      }
    };
    getAuth();
  }, []);

  useEffect(() => {
    if (localAccessToken && localRefreshToken) {
      const intervalId = setInterval(checkTokenExpiration, 5 * 60 * 1000);
      return () => clearInterval(intervalId);
    }
  }, [localAccessToken, localRefreshToken]);

  //function for login
  //This part will set user data in local storage
  const handleLogin = async ({ email, password, setError }: LoginParams) => {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_ENDPOINT + authConfig.loginEndpoint,
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem(
          authConfig.storageTokenKeyName,
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem(
          authConfig.onTokenExpiration,
          JSON.stringify(response.data.refreshToken)
        );
        const storedToken = window.localStorage.getItem(
          authConfig.storageTokenKeyName
        );

        if (storedToken) {
          const token = storedToken.replace(/"/g, "");

          setLoading(true);
          setAccess(token);
          await axios
            .get(GET_USER_ENDPOINT, {
              headers: {
                Authorization: token,
              },
            })
            .then(async (response) => {
              if (response.status === 200) {
                setUser({ ...response.data.userData });
                setLoading(false);
                if (response?.data?.userData?.trainerId) {
                  try {
                    const result = await axios.get(GET_TRAINER_ENDPOINT, {
                      headers: {
                        Authorization: token,
                      },
                    });

                    if (result.status === 200) {
                      setTrainer(result.data.trainer);
                      setLoading(false);
                      setIsTrainer(true);
                    }
                  } catch (error) {
                    if (axios.isAxiosError(error)) {
                      console.error(error);
                      setIsTrainer(false);
                    }
                    console.error(error);
                    setIsTrainer(false);
                  }
                } else {
                  setIsTrainer(false);
                }

                if (router.query && router.query.returnUrl) {
                  const returnUrl = Array.isArray(router.query.returnUrl)
                    ? router.query.returnUrl[0]
                    : router.query.returnUrl;
                  router.push(returnUrl);
                } else {
                  router.push("/");
                }
                // router.push(returnUrl);
              } else {
                console.log("No");
              }
            })
            .catch((err) => {
              // console.log("Err")
              console.log(err);
              localStorage.removeItem(authConfig.storageTokenKeyName);
              localStorage.removeItem(authConfig.onTokenExpiration);
              setUser(null);
              setLoading(false);
              router.replace(authConfig.loginEndpoint);
            });
        } else {
          console.log("No data");
          setLoading(false);
        }
      } else {
        router.replace(authConfig.loginEndpoint);
        setLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError &&
          setError(error.response?.data.fieldError, {
            type: "manual",
            message: error.response?.data.message,
          });
      }
    }
  };

  const handleClose = () => {
    setIsTokenExpired(false);
  };

  const handleSetTrainer = async () => {
    if (user?.trainerId) {
      setLoading(true);
      try {
        console.log("eiei");
        const result = await axios.get(GET_TRAINER_ENDPOINT, {
          headers: {
            Authorization: token,
          },
        });

        if (result.status === 200) {
          setTrainer(result.data.trainer);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error);
        }
        console.error(error);
      }
    }
  };

  // This part clear user data in localStorage
  const handleLogout = () => {
    setLoading(true);
    setIsTrainer(null)
    setUser(null);
    setTrainer(null);
    localStorage.removeItem(authConfig.storageTokenKeyName);
    localStorage.removeItem(authConfig.onTokenExpiration);
    router.push("/");
    setLoading(false);
  };

  const values: AuthValuesType = {
    user,
    trainer,
    token,
    isTrainer,
    loading,
    setUser,
    setTrainer,
    setLoading,
    login: handleLogin,
    setTrainerMode: handleSetTrainer,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={values}>
      <AuthStatus getOpen={isTokenExpired} handleClose={handleClose} />

      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
