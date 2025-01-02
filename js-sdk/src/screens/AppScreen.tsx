"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import useFetchSingleApp from "@/hooks/useFetchSingleApp";
import Image from "next/image";
import { apiActions } from "@/utils/apiActions";
import InfoCard from "@/components/InfoCard";
import useCobalt from "@/hooks/useCobalt";
import { handleConnect } from "@/methods/connectApp";
import { handleDisconnect } from "@/methods/disConnectApp";
import { handleConfig } from "@/methods/configApp";
import { updateConfig } from "@/methods/updateConfig";

const AppScreen = () => {
  const { Cobalt } = useCobalt();
  const params = useParams();
  const slug = params.slug!;
  const { app, loading, error } = useFetchSingleApp(slug);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigRunning, setIsConfigRunning] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [configInfo, setConfigInfo] = useState({});
  const [formData, setFormData] = useState({});
  const [workflowData, setWorkFlowData] = useState([]);

  const connectApp = (slug: string) => {
    if (Cobalt) {
      handleConnect(Cobalt, slug, setIsConnected);
    }
  };

  const disconnectApp = (slug: string) => {
    if (Cobalt) {
      handleDisconnect(Cobalt, slug, setIsConnected);
    }
  };

  const fetchConfig = () => {
    if (Cobalt && slug) {
      handleConfig(
        Cobalt,
        slug[0],
        setConfigInfo,
        setIsModalOpen,
        setIsConfigRunning
      );
    }
  };

  const handleShowWorkspace = () => {
    setShowWorkspace((prevState) => !prevState);
  };

  const updateConfiguration = () => {
    if (Cobalt && slug) {
      updateConfig(
        Cobalt,
        workflowData,
        slug[0],
        formData,
        setConfigInfo,
        setIsModalOpen
      ); // Pass Cobalt and state setters
    }
  };

  const handleInputChange = (type, id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [id]: value,
      },
    }));
  };

  const handleWorkFlowChange = (
    enabled: boolean,
    workflowId: string,
    fieldId: string,
    field: any
  ) => {
    setWorkFlowData((prevData) => {
      const existingWorkflow = prevData.find(
        (workflow) => workflow.id === workflowId
      );

      if (!existingWorkflow) {
        return [
          ...prevData,
          {
            id: workflowId,
            enabled,
            fields: {
              [fieldId]: field,
            },
          },
        ];
      } else {
        return prevData.map((workflow) =>
          workflow.id === workflowId
            ? {
                ...workflow,
                enabled,
                fields: {
                  ...workflow.fields,
                  [fieldId]: field,
                },
              }
            : workflow
        );
      }
    });
  };

  if (loading) {
    return <div>Loading app details...</div>;
  }

  if (error) {
    return <div>Some error occurred while fetching the app..</div>;
  }

  return (
    <>
      {app ? (
        <div className="grid grid-cols-1 gap-6 mt-8">
          {/* App Details Card */}
          <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 border items-center sm:items-start">
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
              <div className="flex mt-2 justify-left items-center space-x-4">
                {isConnected ? (
                  <>
                    <p className="text-green-500 font-semibold">Connected</p>
                    <button
                      onClick={() => disconnectApp(app.slug)}
                      className="bg-red-500 text-white rounded-lg shadow-md py-1 px-2 transition-transform transform hover:scale-105 hover:bg-red-600"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => connectApp(app.slug)}
                      className="bg-gray-200 text-blue-800 py-1 px-2 rounded-lg shadow-md"
                    >
                      Connect
                    </button>
                  </>
                )}

                <button
                  onClick={() => fetchConfig()}
                  className="bg-gray-200 text-blue-800 py-1 px-2 rounded-lg shadow-md"
                >
                  Config
                </button>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="fixed bottom-8 right-8 border border-black rounded-lg">
            {apiActions && apiActions[1] && <InfoCard method={apiActions[1]} />}
            {apiActions && apiActions[2] && <InfoCard method={apiActions[2]} />}
            {apiActions && apiActions[3] && <InfoCard method={apiActions[3]} />}
            {apiActions && apiActions[4] && <InfoCard method={apiActions[4]} />}
            {apiActions && apiActions[5] && <InfoCard method={apiActions[5]} />}
          </div>
        </div>
      ) : (
        <div className="text-center mt-8 text-gray-500">
          No app data available.
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            {/* App Image and Description */}
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={app.icon}
                width={50}
                height={50}
                alt={`${app.name} logo`}
                className="rounded-md"
              />
              <div>
                <h3 className="text-xl font-semibold">{app.name}</h3>
                <p className="text-sm text-gray-600">{app.description}</p>
              </div>
            </div>
            {/* Divider Line */}
            <div className="border-t my-4"></div>

            {/* Connection Info */}
            <div className="flex justify-between items-center border-2 border-green-500 p-2 rounded-lg">
              <p className="text-green-500 font-semibold">Connected</p>{" "}
              {/* Status */}
              <button
                onClick={() => disconnectApp(app.slug)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Disconnect
              </button>
            </div>

            {/* Render config options */}
            <div className="mt-4 border-2 bg-gray-50/90 rounded-lg shadow-md p-4 pb-8">
              {configInfo?.fields?.map((field) => (
                <main key={field.id}>
                  <div className="flex justify-between items-center border-b py-2">
                    <div className="flex items-center">
                      {/* Field Name */}
                      <p className="font-semibold text-lg">{field.name}</p>
                    </div>
                    {/* Optional */}
                    <p
                      className={`text-sm ${
                        field.required ? "text-gray-600" : "text-gray-500"
                      }`}
                    >
                      {field.required ? "(Required)" : "(Optional)"}
                    </p>
                  </div>

                  <div className="mt-2">
                    {field.field_type === "text" ? (
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder={`Enter ${field.name}`}
                        onChange={(e) =>
                          handleInputChange("fields", field.id, e.target.value)
                        }
                      />
                    ) : field.field_type === "select" ? (
                      <select
                        onChange={(e) =>
                          handleInputChange("fields", field.id, e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                </main>
              ))}
            </div>

            <section className="mt-4 flex justify-between border-2 bg-gray-50/90 rounded-lg shadow-md p-4 pb-8">
              <div>Sample Workflow</div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showWorkspace}
                    onChange={handleShowWorkspace}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </section>

            {showWorkspace ? (
              <>
                <div className="mt-4">
                  {/* Render workflow fields */}
                  {configInfo.workflows?.map((workflow) =>
                    workflow.fields?.map((field) => (
                      <main key={field.id}>
                        <div className="flex justify-between items-center border-b py-2">
                          <div className="flex items-center">
                            {/* Workflow Field Name */}
                            <p className="font-semibold text-lg">
                              {field.name}
                            </p>
                          </div>
                          {/* Optional */}
                          <p
                            className={`text-sm ${
                              field.required ? "text-gray-600" : "text-gray-500"
                            }`}
                          >
                            {field.required ? "(Required)" : "(Optional)"}
                          </p>
                        </div>

                        <div className="mt-2">
                          {field.field_type === "text" ? (
                            <input
                              onChange={(e) =>
                                handleWorkFlowChange(
                                  workflow.enabled,
                                  workflow.id,
                                  field.id,
                                  e.target.value
                                )
                              }
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder={`Enter ${field.name}`}
                            />
                          ) : field.field_type === "select" ? (
                            <select
                              onChange={(e) =>
                                handleWorkFlowChange(
                                  workflow.enabled,
                                  workflow.id,
                                  field.id,
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          ) : null}
                        </div>
                      </main>
                    ))
                  )}
                </div>
              </>
            ) : (
              <></>
            )}

            <button
              onClick={() => updateConfiguration()}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppScreen;
