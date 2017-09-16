import { Context, ProxyResult } from "aws-lambda";
import { initializeRollbar } from "./rollbar";
import { ITinyAPIEvent } from "./types";

const twilioSmsToEmail = async (event: ITinyAPIEvent, _context?: Context): Promise<ProxyResult> => {
  await initializeRollbar();
  const data = JSON.parse(event.body);

  return {
    body: JSON.stringify(data),
    statusCode: 201,
  };
};

export { twilioSmsToEmail };
