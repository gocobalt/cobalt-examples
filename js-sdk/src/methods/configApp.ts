/**
 * Fetches the specified configuration for the application identified by the slug.
 * This method either retrieves an existing config or creates a new one if it doesn't exist.
 *
 * @param {object} params - The parameters for the config request.
 * @param {string} params.slug - The unique identifier for the application. It is used to fetch the specific config.
 * @returns {Promise<any>} A promise that resolves with the specified config. If the config exists, it returns the config object.
 * If the config does not exist, a new one is created and returned.
 *
 * Example usage:
 * const config = await cobalt.config({ slug: 'my-app' });
 */

import { Config } from "@/components/Config/types";
import { Cobalt } from "@cobaltio/cobalt-js";

export const handleConfig = async (
  cobalt: Cobalt,
  slug: string,
  onFetch: (config: Config) => void,
  onError: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true)
  try {
    const res = await cobalt.config({ slug, labels: [] });
    if (res && typeof(onFetch) === 'function') {
      onFetch(res);
    }
  } catch (err) {
    console.error("Config failed:", err);
    if (typeof(onError) === 'function') onError()
  } finally {
    if (typeof(setLoading) === 'function')
    setLoading(false);
  }
};
