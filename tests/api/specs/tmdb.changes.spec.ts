import { test, expect } from "../fixtures/api-fixture";
import { changesSchema } from "../schemas/changes.schema";
import { validateSchema } from "../utils/schemaValidator";

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
    validateSchema(changesSchema, changes);
  });

  test("Fetch people list", async ({ tmdbClient }) => {
    const changes = await tmdbClient.getPeopleList();

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
    validateSchema(changesSchema, changes);
  });

  test("Fetch tv list", async ({ tmdbClient }) => {
    const changes = await tmdbClient.getTVList();

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
    validateSchema(changesSchema, changes);
  });
});
