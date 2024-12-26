"use client";
import useCobalt from "@/hooks/useCobalt";
import React, { useState } from "react";

const UpdateConfigFieldMethodScreen = () => {
  const { Cobalt } = useCobalt();
  const [slug, setSlug] = useState<string>("");
  const [fieldId, setFieldId] = useState<string>("");
  const [value, setValue] = useState<string | number | boolean | null>("");

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleFieldIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldId(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!slug.trim() || !fieldId.trim()) {
      alert("Slug and Field ID are required.");
      return;
    }

    try {
      if (!Cobalt) {
        console.error("Cobalt instance is not initialized.");
        return;
      }

      const res = await Cobalt.updateConfig(slug, fieldId, value);
      console.log("Config updated successfully:", res);
    } catch (error) {
      console.error("Error updating config:", error);
    }
  };

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">
        Update Config Field
      </h1>
      <section className="max-w-xl">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={handleSlugChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter slug"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Field ID:</label>
          <input
            type="text"
            value={fieldId}
            onChange={handleFieldIdChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter field ID"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Value:</label>
          <input
            type="text"
            value={value as string}
            onChange={handleValueChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter value"
          />
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

export default UpdateConfigFieldMethodScreen;
