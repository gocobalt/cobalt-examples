"use client";
import useCobalt from "@/hooks/useCobalt";
import React, { useState } from "react";

const ConnectMethodScreen = () => {
  const { Cobalt } = useCobalt();
  const [slug, setSlug] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSlug(inputValue);

    setShowButton(!!inputValue.trim());
  };

  const handleSubmit = async () => {
    try {
      const res = await Cobalt.connect(slug);

      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">
        Connect method demo
      </h1>
      <label>Enter Slug: </label>
      <input
        className="border-2 py-2 px-4 rounded-lg shadow-md"
        value={slug}
        onChange={handleChange}
      />
      {showButton && (
        <button
          onClick={handleSubmit}
          className="mt-4 mx-6 py-2 px-6 bg-gray-800 text-white rounded-lg shadow-md"
        >
          Connect
        </button>
      )}
    </>
  );
};

export default ConnectMethodScreen;
