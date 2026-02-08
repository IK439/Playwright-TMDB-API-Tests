import { test, expect } from "../fixtures/api-fixture";
import Ajv from "ajv";
import { certificationsSchema } from "../schemas/certifications.schema";

// Group all movie certification-related API tests together
test.describe("TMDB API - Movie Certifications", () => {
  test("Fetch movie certifications", async ({ tmdbClient }) => {
    const certifications = await tmdbClient.getMovieCertifications();

    expect(certifications.certifications).toBeDefined();

    // Iterate over each country code and its certification list
    for (const [country, certList] of Object.entries(
      certifications.certifications,
    )) {
      expect(Array.isArray(certList)).toBe(true);

      // Validate each certification object in the list
      certList.forEach((cert) => {
        expect(cert.certification).toBeTruthy();
        expect(typeof cert.certification).toBe("string");

        expect(cert.meaning).toBeDefined();
        expect(typeof cert.meaning).toBe("string");

        expect(cert.order).toBeDefined();
        expect(typeof cert.order).toBe("number");
        expect(cert.order).toBeGreaterThanOrEqual(0);
      });
    }

    // Validate the full API response against the schema
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(certificationsSchema);
    const valid = validate(certifications);

    // If validation fails, log detailed schema errors
    if (!valid) {
      console.log(JSON.stringify(validate.errors, null, 2));
    }

    expect(valid).toBe(true);
  });
});

// Group all tv certification-related API tests together
test.describe("TMDB API - TV Certifications", () => {
  test("Fetch tv certifications", async ({ tmdbClient }) => {
    const certifications = await tmdbClient.getTVCertifications();

    expect(certifications.certifications).toBeDefined();

    // Iterate over each country code and its certification list
    for (const [country, certList] of Object.entries(
      certifications.certifications,
    )) {
      expect(Array.isArray(certList)).toBe(true);

      // Validate each certification object in the list
      certList.forEach((cert) => {
        expect(cert.certification).toBeTruthy();
        expect(typeof cert.certification).toBe("string");

        expect(cert.meaning).toBeDefined();
        expect(typeof cert.meaning).toBe("string");

        expect(cert.order).toBeDefined();
        expect(typeof cert.order).toBe("number");
        expect(cert.order).toBeGreaterThanOrEqual(0);
      });
    }

    // Validate the API response against the schema
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(certificationsSchema);
    const valid = validate(certifications);

    // Log schema errors if validation fails
    if (!valid) {
      console.log(JSON.stringify(validate.errors, null, 2));
    }

    expect(valid).toBe(true);
  });
});
