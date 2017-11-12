import { APIGatewayEvent, Callback, Context, ProxyResult } from "aws-lambda";

export type IBaseLambdaHandler = (event: APIGatewayEvent) => Promise<ProxyResult>;

const baseLambdaHandler = (handler: IBaseLambdaHandler) => (
  async (event: APIGatewayEvent, _context: Context, callback: Callback) => {
    try {
      const response: ProxyResult = await handler(event);
      callback(null, response);
    } catch (error) {
      callback(error);
    }
  }
);

export { baseLambdaHandler };
