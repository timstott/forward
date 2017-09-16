import { Context, ProxyResult } from "aws-lambda";
import { initializeRollbar } from "./rollbar";
import { ITinyAPIEvent } from "./types";

const twilioSmsToEmail = async (event: ITinyAPIEvent, _context?: Context): Promise<ProxyResult> => {
  await initializeRollbar();
  JSON.parse(event.body);

  return {
    body: '<?xml version="1.0" encoding="UTF-8" ?><Response></Response>',
    headers: {
      "Content-Type": "application/xml",
    },
    statusCode: 201,
  };
};

export { twilioSmsToEmail };
