"use client";

import { useEffect, useState } from "react";
import CobaltJsSingleton from "../utils/cobalt-js-singleton";
import { useSessionToken } from "@/hooks/useSessionToken";

const useCobalt = () => {
  const { token, isLoading } = useSessionToken(); // Fetch the session token
  const [Cobalt, setCobalt] = useState(null);

  useEffect(() => {
    if (token) {
      // Initialize Cobalt and store the instance
      CobaltJsSingleton.initialize(token);
      const CobaltInstance = CobaltJsSingleton.getInstance();
      setCobalt(CobaltInstance);
    }
  }, [token]);

  return { Cobalt, isLoading };
};

export default useCobalt;
