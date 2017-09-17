export interface ITinyAPIEvent {
  body: string | null;
  pathParameters: { [name: string]: string } | null;
  queryStringParameters: { [name: string]: string } | null;
}

export interface ITwilioPayload {
  ToCountry: string;
  ToState: string;
  SmsMessageSid: string;
  NumMedia: string;
  ToCity: string;
  FromZip: string;
  SmsSid: string;
  FromState: string;
  SmsStatus: string;
  FromCity: string;
  Body: string;
  FromCountry: string;
  To: string;
  ToZip: string;
  NumSegments: string;
  MessageSid: string;
  AccountSid: string;
  From: string;
  ApiVersion: string;
}
