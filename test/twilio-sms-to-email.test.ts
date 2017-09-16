import { twilioSmsToEmail } from "../src/twilio-sms-to-email";

jest.mock("../src/rollbar", () => ({
  initializeRollbar: () => ({}),
}));

describe("twiolioSmsToEmai", () => {
  it("responds with empty SMS response", async () => {
    const request = {
      body: JSON.stringify({name: "Alice"}),
      pathParameters: null,
      queryStringParameters: null,
    };
    const { body, headers, statusCode } = await twilioSmsToEmail(request);

    expect(body).toEqual('<?xml version="1.0" encoding="UTF-8" ?><Response></Response>');
    expect(headers).toHaveProperty("Content-Type", "application/xml");
    expect(statusCode).toEqual(201);
  });
});
