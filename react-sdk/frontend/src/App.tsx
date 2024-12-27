import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import {
  Provider as CobaltProvider,
  Config as CobaltConfig,
} from "@cobaltio/react-cobalt-js";
import Modal from "./components/Modal";
import { useSessionToken } from "./hooks/useSessionToken";
import { BASE_URL } from "./utils/const";

const App = () => {
  const { token, isLoading } = useSessionToken();
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  /**
   * @route   GET https://api.gocobalt.io/api/v2/public/application
   * @desc    This API lists all enabled applications for a specific linked account.
   * @docs    https://docs.gocobalt.io/api-reference/integration-meta/list-applications
   */

  const getApps = async () => {
    try {
      const res = await fetch(`${BASE_URL}/apps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("data is : ", data);
      setApps(data.data);
    } catch (err) {
      console.error("Error fetching apps:", err);
    }
  };

  useEffect(() => {
    if (!isLoading && token) {
      getApps();
    }
  }, [token, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl mb-6 m-4 font-bold">App List</h1>

        {/* Modal to show when an app is selected */}
        <Modal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)}>
          <CobaltProvider
            baseApi="https://sapis.gocobalt.io"
            sessionToken={token}
          >
            <div className="p-4">
              <CobaltConfig
                slug={selectedApp?.slug}
                style={{
                  borderRadius: 8,
                  maxWidth: 450,
                }}
              />
              <button
                onClick={() => setSelectedApp(null)}
                className="mt-4 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full"
              >
                Close
              </button>
            </div>
          </CobaltProvider>
        </Modal>

        <div className="grid grid-cols-1 gap-6">
          {apps.map((app: any) => (
            <div
              key={app.app_id}
              className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 border items-center sm:items-start"
            >
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <img
                  src={app.icon}
                  width={100}
                  height={100}
                  alt={`${app.name} logo`}
                  className="rounded-md"
                />
              </div>

              <div className="flex flex-col justify-between">
                <h2 className="text-lg font-semibold">{app.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{app.description}</p>
                <div className="mt-4">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
