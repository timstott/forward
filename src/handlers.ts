import { asyncHandler } from "./async-handler";
import { errorHandler } from "./rollbar";
import { twilioSmsToEmail } from "./twilio-sms-to-email";

const twilioSmsToEmailHandler = errorHandler(asyncHandler(twilioSmsToEmail));

export { twilioSmsToEmailHandler };
