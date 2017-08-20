import { APIGatewayEvent, Callback, Context, ProxyResult } from "aws-lambda";

const asyncHandlerWrapper = (asyncHandler: (event: APIGatewayEvent, context: Context) => Promise<ProxyResult>) =>
  async (event: APIGatewayEvent, context: Context, callback: Callback) => {
    try {
      const response = await asyncHandler(event, context);
      callback(null, response);
    } catch (error) {
      callback(error);
    }
  };

export { asyncHandlerWrapper };
