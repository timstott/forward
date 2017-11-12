import { twilio as handler } from "../../src/handlers/twilio";
import { decodeTwilioPayload, ISendTwilioEmail, sendTwilioEmail } from "../../src/services";

jest.mock("../../src/services", () => ({
  decodeTwilioPayload: jest.fn(),
  sendTwilioEmail: jest.fn(),
}));

describe("twilio handler", () => {
  it("always responds with empty SMS response", async () => {
    (decodeTwilioPayload as any).mockReturnValue({ content: "foo", originNumber: "bar" });

    const event = {
      body: "body",
      pathParameters: null,
      queryStringParameters: null,
    };
    const { body, headers, statusCode } = await handler(event);

    expect(body).toEqual('<?xml version="1.0" encoding="UTF-8" ?><Response></Response>');
    expect(headers).toHaveProperty("Content-Type", "application/xml");
    expect(statusCode).toEqual(201);

    expect(decodeTwilioPayload).toHaveBeenCalledWith("body");
  });

  it("sends an email with the Twilio request content", async () => {
    (decodeTwilioPayload as any).mockReturnValue({ content: "foo", originNumber: "bar" });
    (sendTwilioEmail as any).mockReturnValue(Promise.resolve());
    const request = {
      body: "",
      pathParameters: null,
      queryStringParameters: { toAddress: "hello@example.com" },
    };

    await handler(request);

    const expected: ISendTwilioEmail = {
        content: "foo",
        destinationAddress: "hello@example.com",
        originNumber: "bar",
    };
    expect(sendTwilioEmail).toBeCalledWith(expected);
  });
});
