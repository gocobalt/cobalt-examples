/**
 * Retrieves the list of enabled applications and their details.
 *
 * @returns {Promise<Application[]>} A promise that resolves to an array of enabled applications and their details.
 *
 * @example
 * // Example of retrieving the list of enabled applications
 * const applications = await cobalt.getApp();
 * console.log(applications);
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import useCobalt from "@/hooks/useCobalt";
import { Application } from "@/types/cobalt";

const useFetchSingleApp = (slug: string) => {
  const { cobalt } = useCobalt();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApp = useCallback(async () => {
    if (!slug) return; // Guard clause for invalid slug

    setLoading(true);
    setError(null);

    try {
      if (!cobalt) {
        throw new Error("cobalt is not initialized");
      }

      const res: Application = await cobalt.getApp(slug); // Explicitly type the response
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
  }, [cobalt, slug]);

  useEffect(() => {
    if (cobalt && slug) {
      fetchApp();
    }
  }, [cobalt, slug, fetchApp]);

  return { app, loading, error, refetch: fetchApp };
};

export default useFetchSingleApp;
