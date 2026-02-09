import { APIRequestContext, expect } from "@playwright/test";
import {
  CertificationsResponse,
  Changes,
  PopularMovies,
  Movie,
} from "../types/movie.types";

// Client wrapper for interacting with the TMDB API
export class TMDBClient {
  #request: APIRequestContext;
  #apiVer: string;
  #apiKey: string;

  // Create a new TMDBClient instance
  constructor(request: APIRequestContext, ver: string, apiKey: string) {
    this.#request = request;
    this.#apiVer = ver;
    this.#apiKey = apiKey;
  }

  // Fetch the list of movie certifications
  async getMovieCertifications(): Promise<CertificationsResponse> {
    const response = await this.#request.get(
      `${this.#apiVer}/certification/movie/list`,
      {
        params: { api_key: this.#apiKey },
      },
    );

    return response.json();
  }

  // Fetch the list of tv certifications
  async getTVCertifications(): Promise<CertificationsResponse> {
    const response = await this.#request.get(
      `${this.#apiVer}/certification/tv/list`,
      {
        params: { api_key: this.#apiKey },
      },
    );

    return response.json();
  }

  // Fetch the list of movie ids that have been changed in the past 24 hours
  async getMovieList(): Promise<Changes> {
    const response = await this.#request.get(`${this.#apiVer}/movie/changes`, {
      params: { api_key: this.#apiKey, page: 1 },
    });

    return response.json();
  }

  // Fetch the list of person ids that have been changed in the past 24 hours
  async getPeopleList(): Promise<Changes> {
    const response = await this.#request.get(`${this.#apiVer}/person/changes`, {
      params: { api_key: this.#apiKey, page: 1 },
    });

    return response.json();
  }

  // Fetch the list of tv ids that have been changed in the past 24 hours
  async getTVList(): Promise<Changes> {
    const response = await this.#request.get(`${this.#apiVer}/tv/changes`, {
      params: { api_key: this.#apiKey, page: 1 },
    });

    return response.json();
  }

  // Fetch a paginated list of popular movies
  async getPopularMovies(): Promise<PopularMovies> {
    const response = await this.#request.get(`${this.#apiVer}/movie/popular`, {
      params: { api_key: this.#apiKey },
    });

    return response.json();
  }

  // Fetch full details for a single movie by its TMDB ID
  async getMovieById(movieId: number): Promise<Movie> {
    const response = await this.#request.get(
      `${this.#apiVer}/movie/${movieId}`,
      {
        params: { api_key: this.#apiKey },
      },
    );

    return response.json();
  }
}
