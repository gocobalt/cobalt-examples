/**
 * Retrieves the list of enabled applications and their details.
 *
 * @returns {Promise<Application[]>} A promise that resolves to an array of enabled applications and their details.
 *
 * @example
 * // Example of retrieving the list of enabled applications
 * const applications = await Cobalt.getApp();
 * console.log(applications);
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import useCobalt from "@/hooks/useCobalt";
import { Application } from "@/types/cobalt";

const useFetchSingleApp = (slug: string) => {
  const { Cobalt } = useCobalt();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApp = useCallback(async () => {
    if (!slug) return; // Guard clause for invalid slug

    setLoading(true);
    setError(null);

    try {
      if (!Cobalt) {
        throw new Error("Cobalt is not initialized");
      }

      const res: Application = await Cobalt.getApp(slug); // Explicitly type the response
      setApp(res);
    } catch (err: unknown) {
      console.error("Error fetching app:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching the app.");
      }
    } finally {
      setLoading(false);
    }
  }, [Cobalt, slug]);

  useEffect(() => {
    if (Cobalt && slug) {
      fetchApp();
    }
  }, [Cobalt, slug, fetchApp]);

  return { app, loading, error, refetch: fetchApp };
};

export default useFetchSingleApp;
