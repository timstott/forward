import { baseHTTPHandler as base } from "../../src/middleware";

describe("base http handler", () => {
  it("packages AWS Lambda request data to the handler", async () => {
    const handler = jest.fn().mockReturnValue(Promise.resolve({}));

    const event: any = {
      body: "Hello World",
      pathParameters: { baz: "👻" },
      queryStringParameters: { foo: "bar", baz: "qux" },
    };

    await base(handler)(event);

    expect(handler).toHaveBeenCalledWith({
      body: "Hello World",
      params: { foo: "bar", baz: "👻" },
    });
  });

  it("returns the handler response", async () => {
    const handler: any = () =>
    Promise.resolve({ body: "Hello Japan", headers: { Accept: "json" }, status: 200});

    const event: any = {
      body: "Hello World",
      pathParameters: { baz: "👻" },
      queryStringParameters: { foo: "bar", baz: "qux" },
    };

    expect(await base(handler)(event)).toEqual({
      body: "Hello Japan",
      headers: { Accept: "json" },
      statusCode: 200,
    });
  });
});
