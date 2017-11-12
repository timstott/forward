import { sendTwilioEmail } from "../../src/services";
import { sendEmail } from "../../src/ses";

jest.mock("../../src/ses");

describe("twilio send email", () => {
  beforeEach(() => (sendEmail as any).mockClear());

  it("sends an email with content", async () => {
    (sendEmail as any).mockReturnValue(Promise.resolve());
    process.env.SOURCE_ADDRESS = "noreply@example.com";

    await sendTwilioEmail({
      content: "I love pizza 🍕!",
      destinationAddress: "hello@example.com",
      originNumber: "+440000000000",
    });

    expect(sendEmail).toBeCalledWith({
      body: "I love pizza 🍕!",
      sourceAddress: "noreply@example.com",
      subject: "Received SMS from +440000000000",
      toAddress: "hello@example.com",
    });
  });
});
