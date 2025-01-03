/**
 * Disconnects from the specified application and removes any associated data from Cobalt.
 *
 * @param {string} slug - The unique identifier (slug) of the application to disconnect from.
 *
 * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
 *
 * @example
 * // Example of disconnecting from an application
 * await Cobalt.disconnect('my-app');
 */

export const handleDisconnect = async (
  Cobalt: any,
  slug: string,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    await Cobalt.disconnect(slug);
    setIsConnected(false);
  } catch (err) {
    console.error("Disconnection Failed:", err);
  }
};
