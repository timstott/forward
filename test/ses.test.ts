import { sesClient } from "../src/aws";
import { sendEmail } from "../src/ses";

describe("sendEmail", () => {
  test("sends an email with SES", async () => {
    const mockSendEmail = jest.fn().mockReturnValue({
      promise: () => Promise.resolve(),
    });
    sesClient.sendEmail = mockSendEmail;

    const result = await sendEmail({
      body: "Incredible",
      sourceAddress: "noreply@example.com",
      subject: "Hello World",
      toAddress: "hello@example.com",
    });

    expect(mockSendEmail).toBeCalledWith(
      {
        Destination: {
          ToAddresses: ["hello@example.com"],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: "Incredible",
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Hello World",
          },
        },
        Source: "noreply@example.com",
      });
  });
});
