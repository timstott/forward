import { get } from "lodash";
import { IHTTPHandlerRequest, IHTTPHandlerResponse } from "../middleware";
import { decodeTwilioPayload, sendTwilioEmail } from "../services";

const twilio = async ({ body, params }: IHTTPHandlerRequest): Promise<IHTTPHandlerResponse> => {
  const destinationAddress = get(params, "toAddress");
  const { content, originNumber } = decodeTwilioPayload(body);

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
    status: 201,
  };
};

export { twilio };
