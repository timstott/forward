import * as qs from "querystring";

const decodeTwilioPayload = (querystring: string) => {
  const parsed = qs.parse(querystring);

  return {
    content: parsed.Body as string,
    destinationCountryCode: parsed.ToCountry as string,
    destinationNumber: parsed.To as string,
    originCountryCode: parsed.FromCountry as string,
    originNumber: parsed.From as string,
  };
};

export { decodeTwilioPayload };
