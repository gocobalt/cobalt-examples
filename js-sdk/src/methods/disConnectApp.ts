// services/disconnect.ts
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
