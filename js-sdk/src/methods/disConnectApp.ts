/**
 * Disconnects from the specified application and removes any associated data from Cobalt.
 *
 * @param {string} slug - The unique identifier (slug) of the application to disconnect from.
 *
 * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
 *
 * @example
 * // Example of disconnecting from an application
 * await cobalt.disconnect('my-app');
 */

import { Cobalt } from "@cobaltio/cobalt-js";

export const handleDisconnect = async (
  cobalt: Cobalt,
  slug: string,
  onDisconnect: () => void,
  onError: () => void
) => {
  try {
    await cobalt.disconnect(slug);
    onDisconnect()
  } catch (err) {
    if (typeof(onError) === 'function') onError()
    console.error("Disconnection Failed:", err);
  }
};
