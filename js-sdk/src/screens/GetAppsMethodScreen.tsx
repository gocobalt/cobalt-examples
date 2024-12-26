"use client";
import useCobalt from "@/hooks/useCobalt";
import { Application } from "@/types/cobalt";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const GetAppsMethodScreen = () => {
  const { Cobalt } = useCobalt();
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState<Application[]>([]);

  const fetchApps = async () => {
    setLoading(true); // Show loading state
    try {
      if (!Cobalt) {
        throw new Error("Cobalt is not initialized");
      }

      const res = await Cobalt.getApps();
      console.log(res);
      setApps(res); // Update state with fetched data
    } catch (err) {
      console.error("Error fetching apps:", err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (Cobalt) {
      fetchApps();
    }
  }, [Cobalt]); // Re-run the effect when Cobalt changes

  if (loading) return <>Loading...</>;

  return (
    <>
      <h1 className="font-semibold underline m-8 text-2xl">
        Get All Apps Method
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {apps.map((app: Application) => (
          <div
            key={app.slug}
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 border items-center sm:items-start"
          >
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
        ))}
      </div>
    </>
  );
};

export default GetAppsMethodScreen;
