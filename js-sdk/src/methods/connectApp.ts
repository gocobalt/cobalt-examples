/**
 * Connects to the specified application with optional authentication data.
 *
 * @param {string} slug - The unique identifier (slug) of the application to connect to.
 * @param {Record<string, string>} [payload] - Optional key-value pairs containing authentication data.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if the connection was successful, otherwise `false`.
 *
 * @example
 * // Example of connecting to an application without auth data
 * const isConnected = await Cobalt.connect('my-app');
 *
 * // Example of connecting to an application with authentication data
 * const authData = { user: 'username', pass: 'password' };
 * const isConnectedWithAuth = await Cobalt.connect('my-app', authData);
 */

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
