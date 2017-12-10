import { sendEmail } from "../ses";

export interface ISendTwilioEmail {
  destinationAddress: string;
  content: string;
  originNumber: string;
}

const sendTwilioEmail = (data: ISendTwilioEmail) => {
  const sourceAddress = process.env.SOURCE_ADDRESS;
  const subject = `Received SMS from ${data.originNumber}`;

  return sendEmail({
    body: data.content,
    sourceAddress,
    subject,
    toAddress: data.destinationAddress,
  });
};

export { sendTwilioEmail };
