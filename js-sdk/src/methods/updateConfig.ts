/**
 * Updates the specified configuration with the provided payload.
 *
 * @param {UpdateConfigPayload} payload - The payload containing the configuration update data.
 * @param {string} [payload.config_id] - Optional configuration ID. If not provided, the default config is used.
 * @param {Record<string, string | number | boolean>} payload.fields - The fields to be updated, with their new values.
 * @param {string} payload.slug - The unique identifier (slug) of the application whose config is being updated.
 * @param {WorkflowPayload[]} payload.workflows - An array of workflows with their enabled status and updated fields.
 * @param {boolean} payload.workflows.enabled - Indicates whether the workflow is enabled or disabled.
 * @param {Record<string, string | number | boolean>} payload.workflows.fields - The fields to update for each workflow.
 * @param {string} payload.workflows.id - The unique identifier for each workflow to update.
 *
 * @returns {Promise<any>} A promise that resolves to the updated configuration.
 *
 * @example
 * // Example of updating a configuration with a specific payload
 * const updatePayload = {
 *   config_id: '12345',
 *   slug: 'my-app',
 *   fields: { theme: 'dark', maxItems: 50 },
 *   workflows: [
 *     { id: 'workflow-1', enabled: true, fields: { step: 'completed' } },
 *     { id: 'workflow-2', enabled: false, fields: { step: 'pending' } }
 *   ]
 * };
 * const updatedConfig = await Cobalt.updateConfig(updatePayload);
 */

import { WorkflowPayload } from "@/types/cobalt";

export const updateConfig = async (
  Cobalt: any,
  workflowData: WorkflowPayload[],
  slug: string,
  formData,
  setConfigInfo: React.Dispatch<React.SetStateAction<any>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const workflowPayload: WorkflowPayload[] = workflowData.map((workflow) => ({
      enabled: workflow.enabled,
      fields: workflow.fields,
      id: workflow.id,
    }));

    const payload = {
      fields: formData.fields || {},
      workflows: workflowPayload,
      slug,
    };

    console.log("config payload is: ", payload);

    const res = await Cobalt.updateConfig(payload);
    if (res) {
      console.log("Config updated successfully:", res);
      setConfigInfo(res);
      setIsModalOpen(false);
    }
  } catch (err) {
    console.error("Failed to update config:", err);
  }
};
