import { KMS } from "aws-sdk";
import { decryptEnv } from "../src/kms";

describe("kms", () => {
  describe("decryptEnv", () => {
    it("throws an exception when the environment variable is blank", () => {
      expect(decryptEnv("SECRET_KEY")).rejects.toEqual({
        error: "BlankEnvironmentVariableError",
        message: "Wont decrypt blank ENV: SECRET_KEY",
      });
    });
  });
});
