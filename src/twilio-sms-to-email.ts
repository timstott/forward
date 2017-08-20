import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { initializeRollbar } from "./rollbar";

const twilioSmsToEmail = async (event: APIGatewayEvent, _context: Context): Promise<ProxyResult> => {
  await initializeRollbar();
  const data = JSON.parse(event.body);

  return {
    body: JSON.stringify(data),
    statusCode: 201,
  };
};

export { twilioSmsToEmail };
