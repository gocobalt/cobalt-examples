import { handleDisconnect } from "@/methods/disConnectApp";
import { Application, Cobalt } from "@cobaltio/cobalt-js";
import { useEffect, useState } from "react";
import Field from "../Field";
import Workflow from "../Workflow";
import { Config } from "./types";
import { updateConfig } from "@/methods/updateConfig";
import { handleConfig } from "@/methods/configApp";
import Error from "../ui/Error";

const ConfigContainer = ({
  app,
  cobalt,
  closeModal,
  setIsConnected
} : {
  app: Application,
  cobalt: Cobalt,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  closeModal: () => void,
}) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  // State to manage config
  const [ config, setConfig ] = useState<Config>({});
  // State to manage App config fields
  const [ appInputData, setAppInputData ] = useState<{
    [key: string] : any
  }>({});
  // State to manage Workflow fields
  const [ workflowsInputData, setWorkflowsInputData ] = useState<{[key: string]: any}>({});
  // State to keep enabled workflow ids
  const [ enabledWorkflows, setEnabledWorkflows ] = useState<string[]>([]);

  const onDisconnect = () => {
    setIsConnected(false)
    closeModal()
  }

  const disconnectApp = () => {
    if (cobalt && app) {
      handleDisconnect(
        cobalt,
        app.slug!,
        onDisconnect,
        () => setError('Error disconnecting app...')
      )
    }
  };

  const updateConfiguration = () => {
    const workflowPayload = config?.workflows?.map(workflow => ({
      id: workflow.id,
      enabled: enabledWorkflows.includes(workflow.id),
      fields: workflowsInputData[workflow.id] || [],
    })) || []
  
    if (cobalt && app) {
      updateConfig(
        cobalt,
        workflowPayload,
        app.slug!,
        appInputData,
        config => {
          setConfig(config)
          closeModal()
        },
        () => setError('Error updating config...')
      );
    }
  };

  // Method to enable/disable a workflow
  const toggleWorkflow = (workflowId: string) => {
    if (enabledWorkflows.includes(workflowId)) {
      setEnabledWorkflows(enabledWorkflows.filter(id => id !== workflowId));
    } else {
      setEnabledWorkflows(enabledWorkflows.concat(workflowId));
    }
  };

  const fetchConfig = () => {
    if (cobalt && app) {
      handleConfig(
        cobalt,
        app.slug!,
        (config) => setConfig(config),
        () => setError('Error fetching config...'),
        setLoading
      );
    }
  };

  useEffect(() => {
     if (!Object.keys(config).length) return
    const appDataSlots: { [key: string]: any } = {};
    for (const ds of config?.fields || []) {
      if (typeof ds.value !== "undefined") {
        appDataSlots[ds.id] = ds.value;
      }
    }
    setAppInputData(appDataSlots);

    const workflowDataSlots: {[key: string]: any} = {};
    const enabledWorkflows : string[] = [];
    for (const workflow of config?.workflows || []) {
      if (!(workflow.id in workflowDataSlots)) {
        workflowDataSlots[workflow.id] = {};
      }

      if (workflow.enabled) {
        enabledWorkflows.push(workflow.id);
      }

      for (const ds of workflow.fields) {
        if (typeof ds.value !== "undefined") {
          workflowDataSlots[workflow.id][ds.id] = ds.value;
        }
      }
    }
    setWorkflowsInputData(workflowDataSlots);
    setEnabledWorkflows(enabledWorkflows);
  }, [config]);

  useEffect(() => {
    // Fetch config when component mounts or app changes
    fetchConfig()
  }, [app])

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return <>
    {error && <Error message={error} onClose={() => setError(null)}/>}

    {/* Connection Info */}
    {<div className="flex justify-between items-center border-2 mb-4 border-green-500 p-2 rounded-lg">
      <p className="text-green-500 font-semibold">Connected</p>{" "}
      {/* Status */}
      <button
        onClick={() => disconnectApp()}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Disconnect
      </button>
    </div>}

    {/* Render config options:
        Here we render all fields from the application config
    */}
    {
      !!config?.fields?.length && (
        config.fields.map(dataslot =>
          <Field
            key={dataslot.id}
            type={dataslot.field_type}
            name={dataslot.name}
            description={dataslot.help_text}
            required={dataslot.required}
            multiple={dataslot.multiple}
            placeholder={dataslot.placeholder}
            options={dataslot.options}
            labels={dataslot.labels}
            value={typeof appInputData?.[dataslot.id] !== "undefined" ? appInputData[dataslot.id] : ""}
            onChange={value => setAppInputData({ ...appInputData, [dataslot.id]: value })}
            mapping={dataslot.mapping}
          />
        )
      )
    }

    {/* Render workflows and their fields
        Here we render all fields defined for each workflow
    */}
    {
      config?.workflows?.map(workflow =>
        <Workflow
          key={workflow.id}
          title={workflow.name}
          description={workflow.description}
          enabled={enabledWorkflows.includes(workflow.id)}
          onEnabledChange={() => toggleWorkflow(workflow.id)}
        >
          {
            workflow?.fields.map(dataslot =>
              <Field
                key={dataslot.id}
                type={dataslot.field_type}
                name={dataslot.name}
                description={dataslot.help_text}
                required={dataslot.required}
                multiple={dataslot.multiple}
                placeholder={dataslot.placeholder}
                options={dataslot.options}
                labels={dataslot.labels}
                value={typeof workflowsInputData?.[workflow.id]?.[dataslot.id] !== "undefined" ? workflowsInputData?.[workflow.id]?.[dataslot.id] : ""}
                onChange={value => {
                  setWorkflowsInputData({
                    ...workflowsInputData,
                    [workflow.id]: {
                      ...workflowsInputData?.[workflow.id],
                      [dataslot.id]: value,
                    },
                  });
                }}
              />
            )
          }
        </Workflow>
      )
    }
    <button
      onClick={() => updateConfiguration()}
      className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Save
    </button>
  </>
}
export default ConfigContainer