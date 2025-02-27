"use client";
import { useState, useEffect } from "react";
import { API_URL, API_KEY, LINKED_ACCOUNT_ID } from "@/utils/const";

export const useSessionToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * @route   POST https://api.gocobalt.io/api/v2/public/session-token
   * @desc    This API generates a session token to authenticate a linked account.
   * @docs    https://docs.gocobalt.io/api-reference/session-token/generate-token-for-linked-account
   */

  const fetchSessionToken = async () => {
    try {
      const res = await fetch(`${API_URL}/session-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${API_KEY}`,
        },
        body: JSON.stringify({
          linked_account_id: `${LINKED_ACCOUNT_ID}`,
        }),
      });
      const data = await res.json();
      setToken(data.token);
    } catch (err) {
      console.error("Error fetching session token:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch token only if not already present in state
    if (!token) {
      fetchSessionToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return { token, isLoading };
};
