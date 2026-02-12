export interface GuestSession {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface Auth {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateSession {
  success: boolean;
  session_id: string;
}

export interface DeleteSession {
  success: boolean;
}

export interface ValidateKey {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface Certifications {
  certification: string;
  meaning: string;
  order: number;
}

export interface CertificationsResponse {
  certifications: Record<string, Certifications[]>;
}

export interface Results {
  id: number;
  adult: boolean;
}

export interface Changes {
  results: Results[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
}

export interface PopularMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface SearchCollectionResponse {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
  }[];
  total_pages: number;
  total_results: number;
}

export interface CollectionDetailsResponse {
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    media_type: string;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
}

export interface CollectionImagesResponse {
  id: number;
  backdrops: {
    aspect_ratio: number;
    height: number;
    iso_3166_1: string | null;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  posters: {
    aspect_ratio: number;
    height: number;
    iso_3166_1: string | null;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
}

export interface CollectionTranslationsResponse {
  id: number;
  translations: {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
      title: string;
      overview: string;
      homepage: string;
    };
  }[];
}
