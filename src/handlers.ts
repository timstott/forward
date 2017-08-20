import { asyncHandlerWrapper } from "./async-handler-wrapper";
import { twilioSmsToEmail } from "./twilio-sms-to-email";

const twilioSmsToEmailHandler = asyncHandlerWrapper(twilioSmsToEmail);

export { twilioSmsToEmailHandler };
