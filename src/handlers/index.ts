import { asyncHandler, errorHandler } from "../middleware";
import { twilio as twilioHandler } from "./twilio";

export const twilio = errorHandler(asyncHandler(twilioHandler));
