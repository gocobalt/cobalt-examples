"use client";
import { useState } from "react";
import { API_URL } from "@/utils/const";
import { useSessionToken } from "./hooks/useSessionToken";

const HostedPortalScreen = () => {
  const { token } = useSessionToken();
  const [url, setUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /**
   * @route   POST /https://sapis.gocobalt.io/api/v2/public/connect-url
   * @desc    Create a Hosted URL
   * @docs    https://docs.gocobalt.io/api-reference/cobalt-connect/get-connect-url
   */

  const handleClick = async () => {
    try {
      const response = await fetch(`${API_URL}/connect-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Replace with your token
        },
        body: JSON.stringify({
          color: "#0000FF",
          bgColor: "#000000",
          name: "abc",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setUrl(data.hosted_url);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch the URL.");
    }
  };

  const handleRedirect = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <main className="flex justify-center items-center flex-col gap-8 ">
        <h1 className="text-3xl font-bold my-8">Hosted Portal Screen</h1>
        <button
          onClick={handleClick}
          className="w-48 h-20 bg-black text-white rounded-lg shadow-md text-lg font-semibold transition-all duration-200 hover:bg-gray-800 hover:scale-105"
        >
          Get URL
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
              <h2 className="text-xl font-bold mb-4">Generated URL</h2>
              <a href={url!} className="text-blue-500 underline break-words">
                {url}
              </a>
              <button
                onClick={handleRedirect}
                className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800"
              >
                Redirect
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 w-full bg-gray-200 text-black py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default HostedPortalScreen;
