import * as AWS from "aws-sdk";
import * as KMS from "aws-sdk/clients/kms";
import * as SES from "aws-sdk/clients/ses";

// Use `AWS_PROFILE` env to load credentials when local invoke
if (process.env.IS_LOCAL) {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE });
}

const sesClient = new SES();

export { KMS, sesClient };
