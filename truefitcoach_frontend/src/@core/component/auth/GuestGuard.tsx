// ** React Imports
import React, { ReactElement, ReactNode, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "../../../้hooks/useAuth";

import authConfig from "../../../configs/auth";
import FallbackSpinner from "../loading/spinner";

interface GuestGuardProps {
  children: ReactNode;
  fallback?: ReactElement | null;
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // if (window.localStorage.getItem(authConfig.storageTokenKeyName)) {
    //   router.replace("/");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route]);

  // Authentication successful
  if (auth.user !== null && auth.loading === true) {
    return <FallbackSpinner />;
  }

  return <>{children}</>;
};

export default GuestGuard;
