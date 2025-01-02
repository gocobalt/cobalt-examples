export interface Card {
  id: number;
  title: string;
  navUrl: string;
  description: string;
}

export interface Application {
  auth_input_map?: InputField[];
  auth_type: "oauth2" | "keybased";
  connected?: boolean;
  description: string;
  icon: string;
  name: string;
  reauth_required?: boolean;
  slug?: string;
  type: string;
}

export interface ApiAction {
  id: number;
  title: string;
  links: string[];
  fileName: string;
  lineNumber: string;
  description: string;
}

interface WorkflowPayload {
  enabled: boolean;
  fields: Record<string, string | number | boolean>;
  id: string;
}
