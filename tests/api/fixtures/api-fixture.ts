import { test as base } from "@playwright/test";
import { TMDBClient } from "../clients/tmdb.client";

// Define the custom fixtures available to tests
// tmdbClient will be injected into test contexts
type MyFixtures = {
  tmdbClient: TMDBClient;
};

// Extend Playwright's base test with custom fixtures
export const test = base.extend<MyFixtures>({
  // Define the tmdbClient fixture
  tmdbClient: async ({ request }, use) => {
    const version = process.env.TMDB_API_VERSION;
    const apiKey = process.env.TMDB_API_KEY;

    if (!version || !apiKey) {
      throw new Error("TMDB environment variables not set");
    }

    // Create a new TMDBClient using Playwright's APIRequestContext
    const client = new TMDBClient(request, version, apiKey);

    // Make the client available to the test
    await use(client);

    // Cleanup logic would go here if needed
  },
});

// Re-export expect so tests can import from this fixture file
export { expect } from "@playwright/test";
