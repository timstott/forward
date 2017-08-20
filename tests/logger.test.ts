import { Logger } from "winston";
import { logger } from '../src/logger';

describe('logger', () => {
  it('is an instance of Logger', () => {
    expect(logger).toBeInstanceOf(Logger);
  });
})