import { Context, ProxyResult } from "aws-lambda";
import { get } from "lodash";
import * as qs from "querystring";
import { sendEmail } from "./ses";
import { ITinyAPIEvent } from "./types";

const decodePayload = (input: any) => ({
  Body: input.Body,
  From: input.From,
});

const twilioSmsToEmail = async (event: ITinyAPIEvent, _context?: Context): Promise<ProxyResult> => {
  const sourceAddress = process.env.SOURCE_ADDRESS;
  const payload = decodePayload(qs.parse(event.body));
  const content = payload.Body;
  const subject = `Inboud message from ${payload.From}`;
  const toAddress = String(get(event, "queryStringParameters.toAddress"));

  await sendEmail({
    body: content,
    source: sourceAddress,
    subject,
    toAddress,
  });

  return {
    body: '<?xml version="1.0" encoding="UTF-8" ?><Response></Response>',
    headers: {
      "Content-Type": "application/xml",
    },
    statusCode: 201,
  };
};

export { twilioSmsToEmail };
