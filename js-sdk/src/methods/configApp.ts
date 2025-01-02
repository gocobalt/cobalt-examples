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
      setConfigInfo(res); // Update config info with the response
    }
  } catch (err) {
    console.error("Config failed:", err);
  } finally {
    setIsConfigRunning(false);
  }
};
