import { APIRequestContext, expect } from "@playwright/test";
import type * as Type from "../types/tmdb.types";

// Client wrapper for interacting with the TMDB API
export class TMDBClient {
  #request: APIRequestContext;
  #apiVer: string;
  #apiKey: string;

  constructor(request: APIRequestContext, ver: string, apiKey: string) {
    this.#request = request;
    this.#apiVer = ver;
    this.#apiKey = apiKey;
  }

  // Create guest session
  async createGuestSession(): Promise<Type.GuestSession> {
    const response = await this.#request.get(
      `${this.#apiVer}/authentication/guest_session/new`,
      {
        params: { api_key: this.#apiKey },
      },
    );

    return response.json();
  }

  // Create request token
  async getRequestToken(): Promise<Type.Auth> {
    const response = await this.#request.get(
      `${this.#apiVer}/authentication/token/new`,
      {
        params: { api_key: this.#apiKey },
      },
    );

    return response.json();
  }

  // Create session (with login)
  async postAuth(
    userName: string,
    passWord: string,
    requestToken: string,
  ): Promise<Type.Auth> {
    const response = await this.#request.post(
      `${this.#apiVer}/authentication/token/validate_with_login`,
      {
        params: { api_key: this.#apiKey },
        data: {
          username: userName,
          password: passWord,
          request_token: requestToken,
        },
      },
    );

    return response.json();
  }

  // Create session
  async createSession(requestToken: string): Promise<Type.CreateSession> {
    const response = await this.#request.post(
      `${this.#apiVer}/authentication/session/new`,
      {
        params: { api_key: this.#apiKey },
        data: {
          request_token: requestToken,
        },
      },
    );

    return response.json();
  }

  // Delete session
  async deleteSession(sessionId: string): Promise<Type.DeleteSession> {
    const response = await this.#request.delete(
      `${this.#apiVer}/authentication/session`,
      {
        params: { api_key: this.#apiKey },
        data: {
          session_id: sessionId,
        },
      },
    );

    return response.json();
  }

  // Check valid key response
  async validKeyResponse(): Promise<Type.ValidateKey> {
    const response = await this.#request.get(`${this.#apiVer}/authentication`, {
      params: { api_key: this.#apiKey },
    });

    return response.json();
  }

  // Check invalid key response
  async invalidKeyResponse(): Promise<Type.ValidateKey> {
    const response = await this.#request.get(`${this.#apiVer}/authentication`, {
      params: { api_key: "Invalid Key" },
    });

    return response.json();
  }

  // Fetch the list of movie certifications
  async getMovieCertifications(): Promise<Type.CertificationsResponse> {
    const response = await this.#request.get(
      `${this.#apiVer}/certification/movie/list`,
      {
        params: { api_key: this.#apiKey },
      },
    );

    return response.json();
  }

  // Fetch the list of tv certifications
  async getTVCertifications(): Promise<Type.CertificationsResponse> {
    const response = await this.#request.get(
      `${this.#apiVer}/certification/tv/list`,
      {
        params: { api_key: this.#apiKey },
      },
    );

    return response.json();
  }

  // Fetch the list of movie ids that have been changed in the past 24 hours
  async getMovieList(): Promise<Type.Changes> {
    const response = await this.#request.get(`${this.#apiVer}/movie/changes`, {
      params: { api_key: this.#apiKey, page: 1 },
    });

    return response.json();
  }

  // Fetch the list of person ids that have been changed in the past 24 hours
  async getPeopleList(): Promise<Type.Changes> {
    const response = await this.#request.get(`${this.#apiVer}/person/changes`, {
      params: { api_key: this.#apiKey, page: 1 },
    });

    return response.json();
  }

  // Fetch the list of tv ids that have been changed in the past 24 hours
  async getTVList(): Promise<Type.Changes> {
    const response = await this.#request.get(`${this.#apiVer}/tv/changes`, {
      params: { api_key: this.#apiKey, page: 1 },
    });

    return response.json();
  }

  // Fetch a paginated list of popular movies
  async getPopularMovies(): Promise<Type.PopularMovies> {
    const response = await this.#request.get(`${this.#apiVer}/movie/popular`, {
      params: { api_key: this.#apiKey },
    });

    return response.json();
  }

  // Fetch full details for a single movie by its TMDB ID
  async getMovieById(movieId: number): Promise<Type.Movie> {
    const response = await this.#request.get(
      `${this.#apiVer}/movie/${movieId}`,
      {
        params: { api_key: this.#apiKey },
      },
    );

    return response.json();
  }

  // Fetch collection
  async getCollection(): Promise<Type.SearchCollectionResponse> {
    const response = await this.#request.get(
      `${this.#apiVer}/search/collection`,
      {
        params: {
          api_key: this.#apiKey,
          query: "The Avengers Collection",
          language: "en-US",
          page: 1,
        },
      },
    );

    return response.json();
  }

  // Fetch collection details
  async getCollectionDetail(
    collectionId: number,
  ): Promise<Type.CollectionDetailsResponse> {
    const response = await this.#request.get(
      `${this.#apiVer}/collection/${collectionId}`,
      {
        params: { api_key: this.#apiKey, collection_id: collectionId },
      },
    );

    return response.json();
  }
}
