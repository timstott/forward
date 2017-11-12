import { IBaseLambdaHandler } from "./base-lambda-handler";

export interface IHTTPHandlerRequest {
  body: string;
  params: {};
}

export interface IHTTPHandlerResponse {
  body?: string;
  headers?: {};
  status: number;
}

export type IHTTPHandler = (request: IHTTPHandlerRequest) => Promise<IHTTPHandlerResponse>;

const baseHTTPHandler = (handler: IHTTPHandler): IBaseLambdaHandler => (
  async (event) => {
    const { body } = event;
    const params = {
      ...event.queryStringParameters,
      ...event.pathParameters,
    };
    const result = await handler({ body, params });

    return {
      body: result.body,
      headers: result.headers,
      statusCode: result.status,
    };
  }
);

export { baseHTTPHandler };
