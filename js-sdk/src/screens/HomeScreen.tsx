"use client";
import React from "react";
import useFetchApps from "@/hooks/useFetchApps";
import { Application } from "@cobaltio/cobalt-js";
import Image from "next/image";
import Link from "next/link";
import InfoCard from "@/components/InfoCard";
import { apiActions } from "@/utils/apiActions";

const HomeScreen: React.FC = () => {
  const { apps, loading } = useFetchApps();

  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {apps.map((app: Application) => (
          <Link
            href={`/apps/${app.slug}`}
            key={app.slug}
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 cursor-pointer border items-center sm:items-start  transition-all duration-300 transform hover:scale-105 hover:shadow-lg "
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
              <div className="flex justify-left items-center space-x-8">
                <button className="mt-2 max-w-[100px] px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md py-1 transition-all duration-200">
                  View app
                </button>
              </div>
            </div>
          </Link>
        ))}

        {/* Info Card */}
        <div className="fixed bottom-8 right-8">
          <InfoCard method={apiActions[0]} />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
