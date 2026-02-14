import { APIRequestContext } from "@playwright/test";

// Base client encapsulates HTTP method helpers for TMDB API
export class BaseClient {
  protected request: APIRequestContext;
  protected apiVer: string;
  protected apiKey: string;

  constructor(request: APIRequestContext, ver: string, apiKey: string) {
    this.request = request;
    this.apiVer = ver;
    this.apiKey = apiKey;
  }

  protected async get<T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<T> {
    const response = await this.request.get(`${this.apiVer}${url}`, {
      params: { api_key: this.apiKey, ...params },
    });

    return response.json();
  }

  protected async post<T>(
    url: string,
    body?: Record<string, any>,
    params?: Record<string, any>,
  ): Promise<T> {
    const response = await this.request.post(`${this.apiVer}${url}`, {
      params: { api_key: this.apiKey, ...params },
      data: body,
    });

    return response.json();
  }

  protected async delete<T>(
    url: string,
    body?: Record<string, any>,
    params?: Record<string, string>,
  ): Promise<T> {
    const response = await this.request.delete(`${this.apiVer}${url}`, {
      params: { api_key: this.apiKey, ...params },
      data: body,
    });

    return response.json();
  }
}
