"use client";

import { useState, useEffect, useCallback } from "react";
import useCobalt from "@/hooks/useCobalt";
import { Application } from "@/types/cobalt";

const useFetchApps = () => {
  const { Cobalt } = useCobalt();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      if (!Cobalt) {
        throw new Error("Cobalt is not initialized");
      }

      const res = await Cobalt.getApps();
      setApps(res); // Update state with fetched data
    } catch (err: any) {
      console.error("Error fetching apps:", err);
      setError(err.message || "An error occurred while fetching apps.");
    } finally {
      setLoading(false);
    }
  }, [Cobalt]);

  useEffect(() => {
    if (Cobalt) {
      fetchApps();
    }
  }, [Cobalt, fetchApps]);

  return { apps, loading, error, refetch: fetchApps };
};

export default useFetchApps;
