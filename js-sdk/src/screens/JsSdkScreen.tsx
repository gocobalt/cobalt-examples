import React from "react";
import { jsSdkMethods } from "@/utils/js-sdk-methods";
import { Card } from "@/types/cobalt";
import Link from "next/link";

const JsSdkScreen = () => {
  return (
    <>
      <main className="mt-16">
        <h1 className="text-3xl font-bold mb-8 underline">Javascript Sdk </h1>
        {jsSdkMethods.map((method: Card) => (
          <div key={method.id} className="lg:w-[800px] cursor-pointer ">
            <Link href={method.navUrl}>
              <div className="border rounded-lg my-8 shadow-md border-gray-400 p-4 flex flex-col justify-between leading-normal transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="mb-8">
                  <h1 className="text-gray-900 font-bold text-xl mb-2">
                    {method.title}
                  </h1>
                  <p className="text-gray-700 text-base">
                    {method.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
};

export default JsSdkScreen;
