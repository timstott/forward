import { asyncHandler } from "./async-handler";
import { twilioSmsToEmail } from "./twilio-sms-to-email";

const twilioSmsToEmailHandler = asyncHandler(twilioSmsToEmail);

export { twilioSmsToEmailHandler };
