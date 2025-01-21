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
 * const isConnected = await cobalt.connect('my-app');
 *
 * // Example of connecting to an application with authentication data
 * const authData = { user: 'username', pass: 'password' };
 * const isConnectedWithAuth = await cobalt.connect('my-app', authData);
 */

import { Cobalt } from "@cobaltio/cobalt-js";

export const handleConnect = async (
  cobalt: Cobalt,
  slug: string,
  inputData: any,
  onConnect: () => void
) => {
  try {
    const res = await cobalt.connect(slug, inputData);
    if (res) {
      console.log(res);
      if (res === true) {
        onConnect()
      }
    }
  } catch (err) {
    console.error("Connection failed:", err);
  }
};
