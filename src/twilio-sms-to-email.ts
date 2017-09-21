import { Context, ProxyResult } from "aws-lambda";
import { get } from "lodash";
import * as qs from "querystring";
import { sendEmail } from "./ses";
import { ITinyAPIEvent, ITwilioPayload } from "./types";

const twilioSmsToEmail = async (event: ITinyAPIEvent, _context?: Context): Promise<ProxyResult> => {
  const sourceAddress = process.env.SOURCE_ADDRESS;
  const payload = qs.parse(event.body) as ITwilioPayload;
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
