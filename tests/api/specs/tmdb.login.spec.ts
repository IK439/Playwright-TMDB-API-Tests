import { test, expect } from "../fixtures/api-fixture";

// Group all authentication-related API tests together
test.describe("TMDB API - Auth", () => {
  test("Create request token, then create session (with login)", async ({
    tmdbClient,
  }) => {
    const token = await tmdbClient.getRequestToken();

    expect(token.success).toBeTruthy();
    expect(token.expires_at).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(token.request_token).toBeTruthy();

    let requestToken = token.request_token;
    const userName = process.env.TMDB_USERNAME as string;
    const passWord = process.env.TMDB_PASSWORD as string;

    const login = await tmdbClient.postAuth(userName, passWord, requestToken);

    expect(login.success).toBeTruthy();
    expect(login.expires_at).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(login.request_token).toBeTruthy();
  });
});
