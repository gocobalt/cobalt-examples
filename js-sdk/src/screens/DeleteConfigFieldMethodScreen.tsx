"use client";
import useCobalt from "@/hooks/useCobalt";
import { useState } from "react";

const DeleteConfigFieldMethodScreen = () => {
  const { Cobalt } = useCobalt();
  const [slug, setSlug] = useState("");
  const [fieldId, setFieldId] = useState("");

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleFieldIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldId(e.target.value);
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

      const res = await Cobalt.deleteConfigField({
        slug,
        fieldId,
      });
      console.log("Ecosystem lead created:", res);
    } catch (error) {
      console.error("Error creating ecosystem lead:", error);
    }
  };
  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">
        Delete Conifg Field
      </h1>
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
          <label className="block mb-2 font-medium">Enter Field id:</label>
          <input
            type="text"
            value={fieldId}
            onChange={handleFieldIdChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter slug"
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

export default DeleteConfigFieldMethodScreen;
