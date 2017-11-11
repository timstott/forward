import { APIGatewayEvent, Callback, Context, ProxyResult } from "aws-lambda";

type AsyncHandler = (event: {}, context: Context) => Promise<ProxyResult>;

const asyncHandler = (handler: AsyncHandler) => (
  async (event: APIGatewayEvent, context: Context, callback: Callback) => {
    const { body, pathParameters, queryStringParameters } = event;
    const tinyEvent = { body, pathParameters, queryStringParameters };
    try {
      const response = await handler(tinyEvent, context);
      callback(null, response);
    } catch (error) {
      callback(error);
    }
  }
);

export { asyncHandler };
