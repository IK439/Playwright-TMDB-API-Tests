import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import { expect } from "@playwright/test";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validateSchema<T>(schema: object, data: T): void {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  // If validation fails, log detailed schema errors
  if (!valid) {
    console.error("Schema validation errors:");
    console.error(JSON.stringify(validate.errors, null, 2));
  }

  expect(valid).toBe(true);
}
