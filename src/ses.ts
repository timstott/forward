import { sesClient } from "./aws";

interface ISendEmail {
  body: string;
  sourceAddress: string;
  subject: string;
  toAddress: string;
}

const sendEmail = async ({body, sourceAddress, subject, toAddress}: ISendEmail) => {
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
    Source: sourceAddress,
  };

  return sesClient.sendEmail(params).promise();
};

export { sendEmail };
