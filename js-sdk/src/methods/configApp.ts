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
 * const config = await Cobalt.config({ slug: 'my-app' });
 */

export const handleConfig = async (
  Cobalt: any,
  slug: string,
  setConfigInfo: React.Dispatch<React.SetStateAction<any>>, // to update the config info
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>, // to open/close the modal
  setIsConfigRunning: React.Dispatch<React.SetStateAction<boolean>> // to track config loading status
) => {
  setIsModalOpen(true);
  setIsConfigRunning(true);

  try {
    const res = await Cobalt.config({ slug });
    if (res) {
      setConfigInfo(res);
    }
  } catch (err) {
    console.error("Config failed:", err);
  } finally {
    setIsConfigRunning(false);
  }
};
