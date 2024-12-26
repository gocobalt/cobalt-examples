"use client";
import { useState } from "react";
import useCobalt from "@/hooks/useCobalt";
import React from "react";
import Image from "next/image";
import { Application } from "@/types/cobalt";

const GetAppMethodScreen = () => {
  const [slug, setSlug] = useState("");
  const { Cobalt } = useCobalt();
  const [showButton, setShowButton] = useState(false);
  const [app, setApp] = useState<Application | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSlug(inputValue);

    // Update the showButton state
    if (inputValue.trim()) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await Cobalt.getApp(slug);

      setApp(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">Get App Method</h1>
      <label>Enter Slug: </label>
      <input
        className="border-2 py-2 px-4 rounded-lg shadow-md"
        value={slug}
        onChange={handleChange}
      ></input>
      {showButton && (
        <button
          onClick={handleSubmit}
          className="mt-4 mx-6 py-2 px-6 bg-gray-800 text-white rounded-lg shadow-md"
        >
          Get App
        </button>
      )}

      {app ? (
        <>
          <div className="grid grid-cols-1 gap-6 mt-8">
            <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 border items-center sm:items-start">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <Image
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default GetAppMethodScreen;
