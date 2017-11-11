import { readFileSync } from "fs";
import { sendEmail } from "../../src/ses";
import { twilio as handler } from "../../src/handlers/twilio";

const twiolioPayload = readFileSync("./test/fixtures/twilio-on-message-payload.txt", "UTF-8");

jest.mock("../../src/ses");

describe("twilio handler", () => {
  beforeEach(() => (sendEmail as any).mockClear());

  it("responds with empty SMS response", async () => {
    const request = {
      body: twiolioPayload,
      pathParameters: null,
      queryStringParameters: null,
    };
    const { body, headers, statusCode } = await handler(request);

    expect(body).toEqual('<?xml version="1.0" encoding="UTF-8" ?><Response></Response>');
    expect(headers).toHaveProperty("Content-Type", "application/xml");
    expect(statusCode).toEqual(201);
  });

  it("sends an email with the Twilio request content", async () => {
    (sendEmail as any).mockReturnValue(Promise.resolve());
    process.env.SOURCE_ADDRESS = "noreply@example.com";
    const request = {
      body: twiolioPayload,
      pathParameters: null,
      queryStringParameters: { toAddress: "hello@example.com" },
    };

    await handler(request);

    expect(sendEmail).toBeCalledWith({
        body: "Alice",
        source: "noreply@example.com",
        subject: "Inboud message from +440000000000",
        toAddress: "hello@example.com",
      });
  });
});
