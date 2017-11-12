import { readFileSync } from "fs";
import { decodeTwilioPayload } from "../../src/services";

describe("twilio payload decoder", () => {
  it("decodes the payload", () => {
    const twiolioPayload = readFileSync("./test/fixtures/twilio-on-message-payload.txt", "UTF-8");

    expect(decodeTwilioPayload(twiolioPayload)).toEqual({
      content: "Alice",
      destinationCountryCode: "FR",
      destinationNumber: "+33111111111",
      originCountryCode: "JE",
      originNumber: "+440000000000",
    });
  });
});
