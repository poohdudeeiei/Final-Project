import { useEffect, useState } from "react";
import React, { ReactElement, ReactNode } from "react";
import { useAuth } from "../../../้hooks/useAuth";
import { useRouter } from "next/router";
import authConfig from "../../../configs/auth";
import FallbackSpinner from "../loading/spinner";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactElement | null;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {

      if (!router.isReady) {
        return;
      }
      if (
        auth.user === null &&
        !window.localStorage.getItem(authConfig.storageTokenKeyName) &&
        !window.localStorage.getItem(authConfig.onTokenExpiration)
      ) {
        if (router.asPath !== "/") {
          setLoading(false)
          router.replace({
            pathname: "/auth/signIn",
            query: { returnUrl: router.asPath },
          });
        }
      } else {
        setLoading(false)
      }
      setLoading(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  );

  if(loading){
    return <FallbackSpinner />;
  }

  if (auth.loading === true || auth.user === null) {
    return <FallbackSpinner />;
  }

  return <>{children}</>;
};

export default AuthGuard;
