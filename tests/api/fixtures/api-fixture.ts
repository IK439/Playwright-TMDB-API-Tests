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
    // Create a new TMDBClient using Playwright's APIRequestContext
    // API version and API key are read from environment variables
    const client = new TMDBClient(
      request,
      process.env.TMDB_API_VERSION as string,
      process.env.TMDB_API_KEY as string,
    );

    // Make the client available to the test
    await use(client);

    // Cleanup logic would go here if needed
  },
});

// Re-export expect so tests can import from this fixture file
export { expect } from "@playwright/test";
