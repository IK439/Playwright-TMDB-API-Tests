import { test, expect } from "../fixtures/api-fixture";
import * as Schema from "../schemas/collections.schema";
import { validateSchema } from "../utils/schemaValidator";

// Group collection API tests together
test.describe("TMDB API - Collection", () => {
  test("Fetch collection", async ({ tmdbClient }) => {
    const collection = await tmdbClient.collections.getCollection();

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
    const collection = await tmdbClient.collections.getCollection();

    const collectionId: number = collection.results[0].id;

    const collectionDetail =
      await tmdbClient.collections.getCollectionDetails(collectionId);

    expect(collectionDetail.id).toBeDefined();
    expect(collectionDetail.name).toContain("The Avengers Collection");
    expect(collectionDetail.original_language).toContain("en");
    expect(collectionDetail.original_name).toContain("The Avengers Collection");
    expect(collectionDetail.overview.length).toBeGreaterThan(0);
    expect(collectionDetail.poster_path).toBeDefined();
    expect(collectionDetail.backdrop_path).toBeDefined();
    expect(Array.isArray(collectionDetail.parts)).toBe(true);
    expect(collectionDetail.parts.length).toBeGreaterThan(0);

    for (const part of collectionDetail.parts) {
      expect(part.adult).toBeFalsy();
      expect(part.backdrop_path).toBeDefined();
      expect(part.id).toBeDefined();
      expect(part.title).toBeDefined();
      expect(part.original_title).toBeDefined();
      expect(part.overview.length).toBeGreaterThan(0);
      expect(part.poster_path).toBeDefined();
      expect(part.media_type).toContain("movie");
      expect(part.original_language).toContain("en");
      expect(part.genre_ids).toBeDefined();
      expect(part.popularity).toBeDefined();
      expect(part.release_date).toMatch(/\d{4}-\d{2}-\d{2}/);
      expect(part.video).toBeFalsy();
      expect(part.vote_average).toBeGreaterThanOrEqual(0);
      expect(part.vote_count).toBeGreaterThanOrEqual(0);
    }

    // Validate the full API response against the schema
    validateSchema(Schema.collectionDetailsSchema, collectionDetail);
  });
});

// Group collection images API tests together
test.describe("TMDB API - Collection Images", () => {
  test("Fetch collection images", async ({ tmdbClient }) => {
    const collection = await tmdbClient.collections.getCollection();

    const collectionId: number = collection.results[0].id;

    const collectionImages =
      await tmdbClient.collections.getCollectionImages(collectionId);

    expect(collectionImages.id).toBeDefined();
    expect(Array.isArray(collectionImages.backdrops)).toBe(true);
    expect(Array.isArray(collectionImages.posters)).toBe(true);

    for (const backdrop of collectionImages.backdrops) {
      expect(backdrop.aspect_ratio).toBeGreaterThanOrEqual(0);
      expect(backdrop.height).toBeGreaterThanOrEqual(0);
      expect(backdrop.iso_3166_1 === null || backdrop.iso_3166_1).toBeTruthy();
      expect(backdrop.iso_639_1 === null || backdrop.iso_639_1).toBeTruthy();
      expect(backdrop.file_path).toBeDefined();
      expect(backdrop.vote_average).toBeGreaterThanOrEqual(0);
      expect(backdrop.vote_count).toBeGreaterThanOrEqual(0);
      expect(backdrop.width).toBeGreaterThan(0);
    }

    for (const poster of collectionImages.posters) {
      expect(poster.aspect_ratio).toBeGreaterThanOrEqual(0);
      expect(poster.height).toBeGreaterThanOrEqual(0);
      expect(poster.iso_3166_1 === null || poster.iso_3166_1).toBeTruthy();
      expect(poster.iso_639_1 === null || poster.iso_639_1).toBeTruthy();
      expect(poster.file_path).toBeDefined();
      expect(poster.vote_average).toBeGreaterThanOrEqual(0);
      expect(poster.vote_count).toBeGreaterThanOrEqual(0);
      expect(poster.width).toBeGreaterThan(0);
    }

    // Validate the full API response against the schema
    validateSchema(Schema.collectionImagesSchema, collectionImages);
  });
});

// Group collection translations API tests together
test.describe("TMDB API - Collection Translations", () => {
  test("Fetch collection translations", async ({ tmdbClient }) => {
    const collection = await tmdbClient.collections.getCollection();

    const collectionId: number = collection.results[0].id;

    const collectionTranslations =
      await tmdbClient.collections.getCollectionTranslations(collectionId);

    expect(collectionTranslations.id).toBeDefined();
    expect(Array.isArray(collectionTranslations.translations)).toBe(true);

    for (const translation of collectionTranslations.translations) {
      expect(translation.iso_3166_1).toBeDefined();
      expect(translation.iso_639_1).toBeDefined();
      expect(translation.name).toBeDefined();
      expect(translation.english_name).toBeDefined();

      expect(translation.data.title).toBeDefined();
      expect(translation.data.overview).toBeDefined();
      expect(translation.data.homepage).toBeDefined();
    }

    // Validate the full API response against the schema
    validateSchema(Schema.collectionTranslationsSchema, collectionTranslations);
  });
});
