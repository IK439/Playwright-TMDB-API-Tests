import { APIRequestContext } from "@playwright/test";
import * as Client from "./index";

export class TMDBClient {
  private request: APIRequestContext;
  private apiVer: string;
  private apiKey: string;

  // Private storage for lazy instances
  private _auth?: Client.AuthClient;
  private _people?: Client.CertificationsClient;
  private _changes?: Client.ChangesClient;
  private _collections?: Client.CollectionsClient;
  private _movies?: Client.MoviesClient;

  constructor(request: APIRequestContext, ver: string, apiKey: string) {
    this.request = request;
    this.apiVer = ver;
    this.apiKey = apiKey;
  }

  // Getters for individual clients
  get auth(): Client.AuthClient {
    if (!this._auth) {
      this._auth = new Client.AuthClient(
        this.request,
        this.apiVer,
        this.apiKey,
      );
    }
    return this._auth;
  }

  get people(): Client.CertificationsClient {
    if (!this._people) {
      this._people = new Client.CertificationsClient(
        this.request,
        this.apiVer,
        this.apiKey,
      );
    }
    return this._people;
  }

  get changes(): Client.ChangesClient {
    if (!this._changes) {
      this._changes = new Client.ChangesClient(
        this.request,
        this.apiVer,
        this.apiKey,
      );
    }
    return this._changes;
  }

  get collections(): Client.CollectionsClient {
    if (!this._collections) {
      this._collections = new Client.CollectionsClient(
        this.request,
        this.apiVer,
        this.apiKey,
      );
    }
    return this._collections;
  }

  get movies(): Client.MoviesClient {
    if (!this._movies) {
      this._movies = new Client.MoviesClient(
        this.request,
        this.apiVer,
        this.apiKey,
      );
    }
    return this._movies;
  }
}
