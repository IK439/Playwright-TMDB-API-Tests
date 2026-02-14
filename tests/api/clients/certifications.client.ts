import { BaseClient } from "./base.client";
import * as Type from "../types/tmdb.types";

export class CertificationsClient extends BaseClient {
  // Fetch the list of movie certifications
  async getMovieCertifications(): Promise<Type.CertificationsResponse> {
    return this.get("/certification/movie/list");
  }

  // Fetch the list of tv certifications
  async getTVCertifications(): Promise<Type.CertificationsResponse> {
    return this.get("/certification/tv/list");
  }
}
