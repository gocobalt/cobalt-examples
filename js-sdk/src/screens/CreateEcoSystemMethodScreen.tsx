"use client";

import useCobalt from "@/hooks/useCobalt";
import { useState } from "react";

const CreateEcoSystemMethodScreen = () => {
  const { Cobalt } = useCobalt();
  const [email, setEmail] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email.trim() || !slug.trim()) {
      alert("Both fields are required.");
      return;
    }

    try {
      if (!Cobalt) {
        console.error("Cobalt instance is not initialized.");
        return;
      }

      const res = await Cobalt.createEcosystemLead({
        email,
        slug,
      });
      console.log("Ecosystem lead created:", res);
    } catch (error) {
      console.error("Error creating ecosystem lead:", error);
    }
  };

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">
        Create Ecosystem Lead
      </h1>
      <section className="max-w-xl">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="border-2 py-2 px-4 rounded-lg shadow-md w-full"
            placeholder="Enter email"
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

export default CreateEcoSystemMethodScreen;
