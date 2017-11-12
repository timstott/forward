import { asyncHandler } from "../middleware";
import { twilio as twilioHandler } from "./twilio";

export const twilio = asyncHandler(twilioHandler);
