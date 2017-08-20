import * as Rollbar from "rollbar";
import { decryptEnv } from "./kms";

type NODE_ENV_TYPE = "dev" | "test" | "production";
const NODE_ENV = process.env.NODE_ENV as NODE_ENV_TYPE;
const isProduction = () => NODE_ENV === "production";

const GIT_SHA = process.env.GIT_SHA;

const initializeRollbar = async () =>
   new Rollbar({
    accessToken: await decryptEnv("ROLLBAR_TOKEN"),
    captureUncaught: isProduction(),
    captureUnhandledRejections: isProduction(),
    payload: {
      environment: NODE_ENV,
      server: {
        branch: GIT_SHA,
      },
    },
  });

export { initializeRollbar };
