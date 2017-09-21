import * as Rollbar from "rollbar";
import { decryptEnv } from "./kms";

type NODE_ENV_TYPE = "dev" | "test" | "production";
const NODE_ENV = process.env.NODE_ENV as NODE_ENV_TYPE;

const GIT_SHA = process.env.GIT_SHA;

const initializeRollbar = async () =>
   new Rollbar({
    accessToken: await decryptEnv("ROLLBAR_TOKEN"),
    payload: {
      environment: NODE_ENV,
      server: {
        branch: GIT_SHA,
      },
    },
  });

const errorHandler = (handler: any) => (
  async (...args: any[]) => {
    const rollbar = await initializeRollbar();
    rollbar.lambdaHandler(handler).apply(null, args);
  }
);

export { initializeRollbar, errorHandler };
