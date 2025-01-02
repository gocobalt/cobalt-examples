import { ApiAction } from "@/types/cobalt";

export const apiActions: ApiAction[] = [
  {
    id: 1,
    title: "Get All Apps",
    links: ["https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#getApps"],
    fileName: "/hooks/useFetchApps.ts",
    lineNumber: "21",
    description: "Returns all the enabled and ecosystem apps.",
  },
  {
    id: 2,
    title: "Get Single App",
    links: ["https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#getApp"],
    fileName: "/hooks/useFetchSingleApp.ts",
    lineNumber: "24",
    description:
      "Returns the application details for the specified application, provided the application is enabled in Cobalt.",
  },
  {
    id: 3,
    title: "Connect App",
    links: ["https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#connect"],
    fileName: "/src/methods/connectApp.ts",
    lineNumber: "8",
    description:
      "Connect the specified application, optionally with the auth data that user provides.",
  },
  {
    id: 4,
    title: "Disconnect App",
    links: [
      "https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#disconnect",
    ],
    fileName: "/src/methods/connectApp.ts",
    lineNumber: "8",
    description:
      "Disconnect the specified application, optionally with the auth data that user provides.",
  },
  {
    id: 5,
    title: "Configure App",
    links: ["https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#config"],
    fileName: "/src/methods/configApp.ts",
    lineNumber: "13",
    description:
      "Returns the specified config, or creates one if it doesn't exist.",
  },
  {
    id: 6,
    title: "Update Config",
    links: [
      "https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#updateConfig",
    ],
    fileName: "/src/methods/updateConfig.ts",
    lineNumber: "27",
    description: "Update the specified config.",
  },
];
