"use client";
import { useState } from "react";
import { API_URL } from "@/utils/const";
import { useSessionToken } from "./hooks/useSessionToken";

const HostedPortalScreen = () => {
  // Fetch session token using custom hook
  const { token } = useSessionToken();

  // State for storing the hosted URL and controlling modal visibility
  const [url, setUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  /**
   * @route   POST /https://sapis.gocobalt.io/api/v2/public/connect-url
   * @desc    Create a Hosted URL
   * @docs    https://docs.gocobalt.io/api-reference/cobalt-connect/get-connect-url
   */

  // Function to handle the "Get URL" button click
  const handleClick = async () => {
    try {
      // Sending POST request to generate a hosted URL using session token
      const response = await fetch(`${API_URL}/connect-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Authorization using Bearer token
        },
        body: JSON.stringify({
          color: "#0000FF",
          bgColor: "#000000",
          name: "abc",
        }),
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Parse the response data and update the URL state
      const data = await response.json();
      console.log(data);
      setUrl(data.hosted_url); // Store the hosted URL
      setShowModal(true); // Show modal with URL
    } catch (err) {
      // Log error and alert if there is an issue with the request
      console.error(err);
      alert("Failed to fetch the URL.");
    }
  };

  // Function to open the URL in a new tab when the "Redirect" button is clicked
  const handleRedirect = () => {
    if (url) {
      window.open(url, "_blank"); // Open the URL in a new tab
    }
  };

  return (
    <>
      <main className="flex justify-center items-center flex-col gap-8 ">
        <h1 className="text-3xl font-bold my-8">Hosted Portal Screen</h1>

        {/* Button to initiate the creation of a hosted URL */}
        <button
          onClick={handleClick}
          className="w-48 h-20 bg-black text-white rounded-lg shadow-md text-lg font-semibold transition-all duration-200 hover:bg-gray-800 hover:scale-105"
        >
          Get URL
        </button>

        {/* Modal to display the generated URL */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
              <h2 className="text-xl font-bold mb-4">Generated URL</h2>
              {/* Display the generated URL */}
              <a href={url!} className="text-blue-500 underline break-words">
                {url}
              </a>
              {/* Button to redirect to the generated URL */}
              <button
                onClick={handleRedirect}
                className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800"
              >
                Redirect
              </button>
              {/* Button to close the modal */}
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
