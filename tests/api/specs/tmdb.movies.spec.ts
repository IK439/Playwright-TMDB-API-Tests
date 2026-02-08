import { test, expect } from "../fixtures/api-fixture";

// Group all movie-related API tests together
test.describe("TMDB API - Movies", () => {
  test("Fetch popular movies", async ({ tmdbClient }) => {
    const popular = await tmdbClient.getPopularMovies();

    expect(popular.page).toBeGreaterThan(0);
    expect(popular.results.length).toBeGreaterThan(0);

    const movie = popular.results[0];
    expect(movie.id).toBeDefined();
    expect(movie.title).toBeTruthy();
    expect(movie.release_date).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  test("Fetch movie details by ID", async ({ tmdbClient }) => {
    const popular = await tmdbClient.getPopularMovies();
    const movieId = popular.results[0].id;

    const movie = await tmdbClient.getMovieById(movieId);

    expect(movie.id).toBe(movieId);
    expect(movie.overview).toBeDefined();
  });

  test("Unauthorized request should fail", async ({ request }) => {
    const response = await request.get("/movie/popular", {
      params: { api_key: "INVALID_KEY" },
    });

    expect(response.status()).toBe(404);
  });
});
