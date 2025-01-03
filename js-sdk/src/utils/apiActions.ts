import { ApiAction } from "@/types/cobalt";

export const apiActions: ApiAction[] = [
  {
    id: 1,
    title: "Get All Apps",
    links: ["https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#getApps"],
    fileName:
      "https://github.com/gocobalt/cobalt-example-test/blob/monorepo-dev/js-sdk/src/hooks/useFetchApps.ts",
    lineNumber: "46",
    description: "Returns all the enabled and ecosystem apps.",
  },
  {
    id: 2,
    title: "Get Single App",
    links: ["https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#getApp"],
    fileName:
      "https://github.com/gocobalt/cobalt-example-test/blob/monorepo-dev/js-sdk/src/hooks/useFetchSingleApp.tsx",
    lineNumber: "35",
    description:
      "Returns the application details for the specified application, provided the application is enabled in Cobalt.",
  },
  {
    id: 3,
    title: "Connect App",
    links: ["https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#connect"],
    fileName:
      "https://github.com/gocobalt/cobalt-example-test/blob/monorepo-dev/js-sdk/src/methods/connectApp.ts",
    lineNumber: "24",
    description:
      "Connect the specified application, optionally with the auth data that user provides.",
  },
  {
    id: 4,
    title: "Disconnect App",
    links: [
      "https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#disconnect",
    ],
    fileName:
      "https://github.com/gocobalt/cobalt-example-test/blob/monorepo-dev/js-sdk/src/methods/disConnectApp.ts",
    lineNumber: "19",
    description:
      "Disconnect the specified application, optionally with the auth data that user provides.",
  },
  {
    id: 5,
    title: "Configure App",
    links: ["https://gocobalt.github.io/cobalt-js/classes/Cobalt.html#config"],
    fileName:
      "https://github.com/gocobalt/cobalt-example-test/blob/monorepo-dev/js-sdk/src/methods/configApp.ts",
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
    fileName:
      "https://github.com/gocobalt/cobalt-example-test/blob/monorepo-dev/js-sdk/src/methods/updateConfig.ts",
    lineNumber: "54",
    description: "Update the specified config.",
  },
];
