import { baseHTTPHandler, baseLambdaHandler } from "../middleware";
import { twilio as twilioHandler } from "./twilio";

export const twilio = baseLambdaHandler(baseHTTPHandler(twilioHandler));
