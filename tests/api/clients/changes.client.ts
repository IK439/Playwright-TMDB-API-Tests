import { BaseClient } from "./base.client";
import * as Type from "../types/tmdb.types";

export class ChangesClient extends BaseClient {
  // Fetch the list of movie ids that have been changed in the past 24 hours
  async getMovieList(): Promise<Type.Changes> {
    return this.get("/movie/changes");
  }

  // Fetch the list of person ids that have been changed in the past 24 hours
  async getPeopleList(): Promise<Type.Changes> {
    return this.get("/person/changes");
  }

  // Fetch the list of tv ids that have been changed in the past 24 hours
  async getTVList(): Promise<Type.Changes> {
    return this.get("/tv/changes");
  }
}
