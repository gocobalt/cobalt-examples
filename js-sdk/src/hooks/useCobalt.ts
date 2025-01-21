"use client";

import { useEffect, useState } from "react";
import CobaltJsSingleton from "../utils/cobalt-js-singleton";
import { useSessionToken } from "@/hooks/useSessionToken";
import { Cobalt } from "@cobaltio/cobalt-js";

const useCobalt = () => {
  const { token, isLoading } = useSessionToken(); // Fetch the session token
  const [ cobalt, setCobalt ] = useState<Cobalt | null>(null);

  useEffect(() => {
    if (token) {
      // Initialize Cobalt and store the instance
      CobaltJsSingleton.initialize(token);
      const CobaltInstance = CobaltJsSingleton.getInstance();
      setCobalt(CobaltInstance);
    }
  }, [token]);

  return { cobalt, isLoading };
};

export default useCobalt;
