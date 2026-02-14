import { BaseClient } from "./base.client";
import * as Type from "../types/tmdb.types";

export class AuthClient extends BaseClient {
  // Create guest session
  async createGuestSession(): Promise<Type.GuestSession> {
    return this.get("/authentication/guest_session/new");
  }

  // Create request token
  async getRequestToken(): Promise<Type.Auth> {
    return this.get("/authentication/token/new");
  }

  // Create session (with login)
  async postAuth(
    userName: string,
    passWord: string,
    requestToken: string,
  ): Promise<Type.Auth> {
    return this.post<Type.Auth>("/authentication/token/validate_with_login", {
      username: userName,
      password: passWord,
      request_token: requestToken,
    });
  }

  // Create session
  async createSession(requestToken: string): Promise<Type.CreateSession> {
    return this.post<Type.CreateSession>("/authentication/session/new", {
      request_token: requestToken,
    });
  }

  // Delete session
  async deleteSession(sessionId: string): Promise<Type.DeleteSession> {
    return this.delete<Type.DeleteSession>("/authentication/session", {
      session_id: sessionId,
    });
  }

  // Check valid key response
  async validKeyResponse(): Promise<Type.ValidateKey> {
    return this.get<Type.ValidateKey>("/authentication");
  }

  // Check invalid key response
  async invalidKeyResponse(): Promise<Type.ValidateKey> {
    return this.get<Type.ValidateKey>("/authentication", {
      api_key: "INVALID_KEY",
    });
  }
}
