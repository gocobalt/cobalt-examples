// services/config.ts
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
