export interface Auth {
  success: boolean;
  expires_at: string;
  request_token: string;
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
