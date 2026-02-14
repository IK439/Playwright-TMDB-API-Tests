import { test, expect } from "../fixtures/api-fixture";

// Group all movie-related API tests together
test.describe("TMDB API - Movies", () => {
  test("Fetch popular movies", async ({ tmdbClient }) => {
    const popular = await tmdbClient.movies.getPopularMovies();

    expect(popular.page).toBeGreaterThan(0);
    expect(popular.results.length).toBeGreaterThan(0);

    const movie = popular.results[0];
    expect(movie.id).toBeDefined();
    expect(movie.title).toBeTruthy();
    expect(movie.release_date).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  test("Fetch movie details by ID", async ({ tmdbClient }) => {
    const popular = await tmdbClient.movies.getPopularMovies();
    const movieId = popular.results[0].id;

    const movie = await tmdbClient.movies.getMovieById(movieId);

    expect(movie.id).toBe(movieId);
    expect(movie.overview).toBeDefined();
  });
});
