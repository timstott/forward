import { APIGatewayEvent, Callback, Context, ProxyResult } from "aws-lambda";
import { ITinyAPIEvent } from "./types";

const asyncHandlerWrapper = (asyncHandler: (event: ITinyAPIEvent, context: Context) => Promise<ProxyResult>) =>
  async ({body, pathParameters, queryStringParameters}: APIGatewayEvent, context: Context, callback: Callback) => {
    const tinyEvent: ITinyAPIEvent = { body, pathParameters, queryStringParameters };
    try {
      const response = await asyncHandler(tinyEvent, context);
      callback(null, response);
    } catch (error) {
      callback(error);
    }
  };

export { asyncHandlerWrapper };
