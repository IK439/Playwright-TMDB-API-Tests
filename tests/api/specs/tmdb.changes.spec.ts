import { test, expect } from "../fixtures/api-fixture";
import Ajv from "ajv";
import { changesSchema } from "../schemas/changes.schema";

// Group all changes-related API tests together
test.describe("TMDB API - Changes", () => {
  test("Fetch movie list", async ({ tmdbClient }) => {
    const changes = await tmdbClient.getMovieList();

    expect(changes.results).toBeDefined();

    // Iterate over the results object
    for (const result of changes.results) {
      expect(result.id).toBeDefined();
      expect(typeof result.adult).toBeTruthy();
    }

    expect(changes.page).toEqual(1);
    expect(changes.total_pages).toBeGreaterThanOrEqual(1);
    expect(changes.total_results).toBeGreaterThanOrEqual(1);

    // Validate the full API response against the schema
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(changesSchema);
    const valid = validate(changes);

    // If validation fails, log detailed schema errors
    if (!valid) {
      console.log(JSON.stringify(validate.errors, null, 2));
    }

    expect(valid).toBe(true);
  });
});
