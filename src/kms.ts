import { ceil, isEmpty, isString } from "lodash";
import { KMS } from "./aws";
import { logger } from "./logger";

const BLANK_ENV_VAR_ERROR = "BlankEnvironmentVariableError";

const client = new KMS();

/**
 * Replaces the first 75% of `value` with '*'
 * @param value
 */
const obfuscate = (value: string) => {
  const size = value.length;
  const threshold = ceil(size * 0.75);
  const endsWith = value.substring(threshold);
  return Array(threshold).join("*") + endsWith;
};

/**
 * Is true when `value` is undefined, null, blank string
 * @param value
 */
const isBlank = (value: any) => isEmpty(value) || (isString(value) && value.trim().length === 0);

const decrypt = async (blob: string) => {
  const ciphertext = Buffer.from(blob, "base64");
  try {
    return (await client.decrypt({ CiphertextBlob: ciphertext }).promise()) .Plaintext .toString();
  } catch (error) {
    logger.error(`${error.name}: ${error.message}`);
    throw error;
  }
};

const decryptEnv = async (key: string) => {
  logger.silly(`Request decrypt ENV: ${key}`);
  const blob = process.env[key];
  if (isBlank(blob)) {
    const message = `Wont decrypt blank ENV: ${key}`;
    logger.error(message);
    throw {
      error: BLANK_ENV_VAR_ERROR,
      message,
    };
  }
  const value = await decrypt(blob);
  logger.silly(`Successfully decrypted ENV: ${key}=${obfuscate(value)}`);
  return value;
};

export { decrypt, decryptEnv };
