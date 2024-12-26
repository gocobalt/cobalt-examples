"use client";
import React, { useState } from "react";
import useCobalt from "@/hooks/useCobalt";

const UpdateConfigMethodScreen = () => {
  const { Cobalt } = useCobalt();
  const [slug, setSlug] = useState<string>("");
  const [fields, setFields] = useState<
    Record<string, string | number | boolean>
  >({});
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addField = () => {
    if (!key.trim() || !value.trim()) {
      alert("Key and value are required to add a field.");
      return;
    }

    setFields((prevFields) => ({
      ...prevFields,
      [key]: isNaN(Number(value)) ? value : Number(value),
    }));
    setKey("");
    setValue("");
  };

  const handleSubmit = async () => {
    if (!slug.trim() || Object.keys(fields).length === 0) {
      alert("Please fill out the slug and at least one field.");
      return;
    }

    try {
      if (!Cobalt) {
        console.error("Cobalt instance is not initialized.");
        return;
      }

      const res = await Cobalt.updateConfig(fields, slug);
      console.log("Config updated successfully:", res);
    } catch (error) {
      console.error("Error updating config:", error);
    }
  };

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">Update Config</h1>
      <section className="max-w-xl">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={handleSlugChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter slug"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter Field Key:</label>
          <input
            type="text"
            value={key}
            onChange={handleKeyChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter field key"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter Field Value:</label>
          <input
            type="text"
            value={value}
            onChange={handleValueChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter field value"
          />
        </div>

        <button
          onClick={addField}
          className="mb-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md"
        >
          Add Field
        </button>

        <div className="mb-4">
          <h2 className="font-medium mb-2">Fields:</h2>
          <ul className="list-disc pl-5">
            {Object.entries(fields).map(([key, value]) => (
              <li key={key}>{`${key}: ${value}`}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 py-2 px-6 bg-gray-800 text-white rounded-lg shadow-md"
        >
          Submit
        </button>
      </section>
    </>
  );
};

export default UpdateConfigMethodScreen;
