export const handleConnect = async (
  Cobalt: any,
  slug: string,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res = await Cobalt.connect(slug);
    if (res) {
      console.log(res);
      if (res === true) {
        setIsConnected(true);
      }
    }
  } catch (err) {
    console.error("Connection failed:", err);
  }
};
