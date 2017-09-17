import { sesClient } from "./aws";

interface ISendEmail {
  body: string;
  source: string;
  subject: string;
  toAddress: string;
}

const sendEmail = async ({body, source, subject, toAddress}: ISendEmail) => {
  const chartset = "UTF-8";

  const params = {
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: chartset,
          Data: body,
        },
      },
      Subject: {
        Charset: chartset,
        Data: subject,
      },
    },
    Source: source,
  };

  return sesClient.sendEmail(params).promise();
};

export { sendEmail };
