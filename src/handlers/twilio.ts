import { Context, ProxyResult } from "aws-lambda";
import { get } from "lodash";
import { decodeTwilioPayload, sendTwilioEmail } from "../services";

const twilio = async (event: any, _context?: Context): Promise<ProxyResult> => {
  const destinationAddress = get(event, "queryStringParameters.toAddress");
  const { content, originNumber } = decodeTwilioPayload(event.body);

  await sendTwilioEmail({
    content,
    destinationAddress,
    originNumber,
  });

  return {
    body: '<?xml version="1.0" encoding="UTF-8" ?><Response></Response>',
    headers: {
      "Content-Type": "application/xml",
    },
    statusCode: 201,
  };
};

export { twilio };
