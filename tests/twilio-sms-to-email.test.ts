import { twilioSmsToEmail } from '../src/twilio-sms-to-email';

jest.mock("../src/rollbar", () => ({
  initializeRollbar: () => {}
}));

describe('twiolioSmsToEmai', () => {
  it('responds with empty SMS response', async () => {
    const request = {
      body: JSON.stringify({name: "Alice"})

    }
    const { body, statusCode } = await twilioSmsToEmail(request, {})

    expect(statusCode).toEqual(201);
  });
})