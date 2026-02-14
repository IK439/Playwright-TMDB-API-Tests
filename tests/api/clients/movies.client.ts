import { BaseClient } from "./base.client";
import * as Type from "../types/tmdb.types";

export class MoviesClient extends BaseClient {
  // Fetch a paginated list of popular movies
  async getPopularMovies(): Promise<Type.PopularMovies> {
    return this.get("/movie/popular");
  }

  // Fetch full details for a single movie by its TMDB ID
  async getMovieById(movieId: number): Promise<Type.Movie> {
    return this.get(`/movie/${movieId}`);
  }
}
