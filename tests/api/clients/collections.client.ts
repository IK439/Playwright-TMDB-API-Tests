import { BaseClient } from "./base.client";
import * as Type from "../types/tmdb.types";

export class CollectionsClient extends BaseClient {
  // Fetch collection
  async getCollection(): Promise<Type.SearchCollectionResponse> {
    return this.get("/search/collection", {
      query: "The Avengers Collection",
      language: "en-US",
      page: 1,
    });
  }

  // Fetch collection details
  async getCollectionDetails(
    collectionId: number,
  ): Promise<Type.CollectionDetailsResponse> {
    return this.get(`/collection/${collectionId}`);
  }

  // Fetch collection images
  async getCollectionImages(
    collectionId: number,
  ): Promise<Type.CollectionImagesResponse> {
    return this.get(`/collection/${collectionId}/images`);
  }

  // Fetch collection translations
  async getCollectionTranslations(
    collectionId: number,
  ): Promise<Type.CollectionTranslationsResponse> {
    return this.get(`/collection/${collectionId}/translations`);
  }
}
