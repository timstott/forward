import { baseLambdaHandler as base } from "../../src/middleware";

describe("base lambda hander", () => {
  it("with successul promise", (done) => {
    expect.assertions(1);
    const handler: any = (data) => Promise.resolve(data);

    const event: any = { foo: "bar" };
    const context: any = {};
    base(handler)(event, context, (_error, response) => {
      expect(response).toEqual({ foo: "bar" });
      done();
    });
  });

  it("with rejected promise", (done) => {
    expect.assertions(1);
    const handler: any = (data) => Promise.reject(data);

    const event: any = { baz: "qux" };
    const context: any = {};
    base(handler)(event, context, (error, _response) => {
      expect(error).toEqual({ baz: "qux" });
      done();
    });
  });
});
