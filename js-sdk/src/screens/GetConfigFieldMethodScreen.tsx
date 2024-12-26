"use client";
import useCobalt from "@/hooks/useCobalt";
import React, { useState } from "react";

const GetConfigFieldMethodScreen = () => {
  const { Cobalt } = useCobalt();
  const [fieldId, setFieldId] = useState<string>(""); // Renamed state variable
  const [slug, setSlug] = useState<string>("");

  const handleFieldIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldId(e.target.value); // Updated handler for fieldId
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleSubmit = async () => {
    if (!fieldId.trim() || !slug.trim()) {
      alert("Both fields are required.");
      return;
    }

    try {
      if (!Cobalt) {
        console.error("Cobalt instance is not initialized.");
        return;
      }

      const res = await Cobalt.getConfigField(fieldId, slug);
      console.log("Ecosystem lead created:", res);
    } catch (error) {
      console.error("Error creating ecosystem lead:", error);
    }
  };

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">Get Config Field</h1>
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
          <label className="block mb-2 font-medium">Enter FieldId:</label>{" "}
          {/* Updated label */}
          <input
            type="text"
            value={fieldId}
            onChange={handleFieldIdChange} // Updated change handler
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter fieldId" // Updated placeholder
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

export default GetConfigFieldMethodScreen;
