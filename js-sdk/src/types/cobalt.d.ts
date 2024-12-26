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
