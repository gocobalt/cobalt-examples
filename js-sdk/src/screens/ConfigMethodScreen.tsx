"use client";
import useCobalt from "@/hooks/useCobalt";
import { useState } from "react";

const ConfigMethodScreen = () => {
  const { Cobalt } = useCobalt();
  const [slug, setSlug] = useState("");
  const [showButton, setShowButton] = useState(false);

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
      const res = await Cobalt.config({
        slug,
        labels: {},
      });

      if (res.status === 200) {
        console.log(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">
        Config method demo
      </h1>
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
          Config
        </button>
      )}
    </>
  );
};

export default ConfigMethodScreen;
