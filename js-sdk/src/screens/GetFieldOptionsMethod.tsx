"use client";
import React, { useState } from "react";
import useCobalt from "@/hooks/useCobalt";

const GetFieldOptionsMethod = () => {
  const { Cobalt } = useCobalt();
  const [lhs, setLhs] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [fieldId, setFieldId] = useState<string>("");
  const [workflowId, setWorkflowId] = useState<string>("");

  const handleLhsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLhs(e.target.value);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleFieldIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldId(e.target.value);
  };

  const handleWorkflowIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkflowId(e.target.value);
  };

  const handleSubmit = async () => {
    if (!lhs.trim() || !slug.trim() || !fieldId.trim()) {
      alert("Please fill out all required fields (lhs, slug, fieldId).");
      return;
    }

    try {
      if (!Cobalt) {
        console.error("Cobalt instance is not initialized.");
        return;
      }

      const res = await Cobalt.getFieldOptions(
        lhs,
        slug,
        fieldId,
        workflowId || undefined
      );
      console.log("Field options fetched:", res);
    } catch (error) {
      console.error("Error fetching field options:", error);
    }
  };

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">
        Get Field Options
      </h1>
      <section className="max-w-xl">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter LHS:</label>
          <input
            type="text"
            value={lhs}
            onChange={handleLhsChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter lhs value"
          />
        </div>
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
          <label className="block mb-2 font-medium">Enter Field ID:</label>
          <input
            type="text"
            value={fieldId}
            onChange={handleFieldIdChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter fieldId"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Enter Workflow ID (optional):
          </label>
          <input
            type="text"
            value={workflowId}
            onChange={handleWorkflowIdChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter workflowId (optional)"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 py-2 px-6 bg-gray-800 text-white rounded-lg shadow-md"
        >
          Fetch Options
        </button>
      </section>
    </>
  );
};

export default GetFieldOptionsMethod;
