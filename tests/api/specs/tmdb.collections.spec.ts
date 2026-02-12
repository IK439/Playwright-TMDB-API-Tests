import { test, expect } from "../fixtures/api-fixture";
import * as Schema from "../schemas/collections.schema";
import { validateSchema } from "../utils/schemaValidator";

// Group collection API tests together
test.describe("TMDB API - Collection", () => {
  test("Fetch collection", async ({ tmdbClient }) => {
    const collection = await tmdbClient.getCollection();

    expect(collection.page).toBe(1);
    expect(Array.isArray(collection.results)).toBe(true);
    expect(collection.results.length).toBeGreaterThan(0);
    expect(collection.total_pages).toBe(1);
    expect(collection.total_results).toBe(1);

    const firstResult = collection.results[0];

    expect(firstResult.adult).toBeFalsy();
    expect(firstResult.backdrop_path).toBeDefined();
    expect(firstResult.id).toBeDefined();
    expect(firstResult.name).toContain("The Avengers Collection");
    expect(firstResult.original_language).toBe("en");
    expect(firstResult.original_name).toContain("The Avengers Collection");
    expect(firstResult.overview.length).toBeGreaterThan(0);
    expect(firstResult.poster_path).toBeDefined();

    // Validate the full API response against the schema
    validateSchema(Schema.searchCollectionSchema, collection);
  });
});

// Group collection details API tests together
test.describe("TMDB API - Collection Details", () => {
  test("Fetch collection details", async ({ tmdbClient }) => {
    const collection = await tmdbClient.getCollection();

    const collectionId: number = collection.results[0].id;

    const collectionDetail = await tmdbClient.getCollectionDetail(collectionId);

    expect(collectionDetail.id).toBeDefined();
    expect(collectionDetail.name).toContain("The Avengers Collection");
    expect(collectionDetail.original_language).toContain("en");
    expect(collectionDetail.original_name).toContain("The Avengers Collection");
    expect(collectionDetail.overview.length).toBeGreaterThan(0);
    expect(collectionDetail.poster_path).toBeDefined();
    expect(collectionDetail.backdrop_path).toBeDefined();
    expect(Array.isArray(collectionDetail.parts)).toBe(true);
    expect(collectionDetail.parts.length).toBeGreaterThan(0);

    const firstPart = collectionDetail.parts[0];

    expect(firstPart.adult).toBeFalsy();
    expect(firstPart.backdrop_path).toBeDefined();
    expect(firstPart.id).toBeDefined();
    expect(firstPart.title).toContain("The Avengers");
    expect(firstPart.original_title).toContain("The Avengers");
    expect(firstPart.overview.length).toBeGreaterThan(0);
    expect(firstPart.poster_path).toBeDefined();
    expect(firstPart.media_type).toContain("movie");
    expect(firstPart.original_language).toContain("en");
    expect(firstPart.genre_ids).toBeDefined();
    expect(firstPart.popularity).toBeDefined();
    expect(firstPart.release_date).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(firstPart.video).toBeFalsy();
    expect(firstPart.vote_average).toBeGreaterThanOrEqual(0);
    expect(firstPart.vote_count).toBeGreaterThanOrEqual(0);

    // Validate the full API response against the schema
    validateSchema(Schema.collectionDetailsSchema, collectionDetail);
  });
});
