import { test, expect } from "../fixtures/api-fixture";

// Group guest session API tests together
test.describe("TMDB API - Guest Session", () => {
  test("Create guest session", async ({ tmdbClient }) => {
    const guestSession = await tmdbClient.auth.createGuestSession();

    expect(guestSession.success).toBeTruthy();
    expect(guestSession.guest_session_id).toBeDefined();
    expect(guestSession.expires_at).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});

// Group all authentication-related API tests together
test.describe("TMDB API - Auth", () => {
  test("Create request token, create session (with login), delete session", async ({
    tmdbClient,
  }) => {
    // Fetch a request token
    const token = await tmdbClient.auth.getRequestToken();

    expect(token.success).toBeTruthy();
    expect(token.expires_at).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(token.request_token).toBeTruthy();

    let requestToken: string = token.request_token;
    const userName = process.env.TMDB_USERNAME as string;
    const passWord = process.env.TMDB_PASSWORD as string;

    // Login with credentials and request token
    const login = await tmdbClient.auth.postAuth(
      userName,
      passWord,
      requestToken,
    );

    expect(login.success).toBeTruthy();
    expect(login.expires_at).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(login.request_token).toBeTruthy();

    // Create authenticated session with validated request token
    const createSession = await tmdbClient.auth.createSession(requestToken);

    expect(createSession.success).toBeTruthy();
    expect(createSession.session_id).toBeTruthy();

    let sessionId: string = createSession.session_id;

    // Terminate the session using session id
    const deleteSession = await tmdbClient.auth.deleteSession(sessionId);

    expect(deleteSession.success).toBeTruthy();
  });
});

// Group validation API tests together
test.describe("TMDB API - Validate Key", () => {
  test("API key is valid response", async ({ tmdbClient }) => {
    const validKey = await tmdbClient.auth.validKeyResponse();

    expect(validKey.success).toStrictEqual(true);
  });

  test("API key is invalid response", async ({ tmdbClient }) => {
    const invalidKey = await tmdbClient.auth.invalidKeyResponse();

    expect(invalidKey.status_code).toEqual(7);
    expect(invalidKey.status_message).toStrictEqual(
      "Invalid API key: You must be granted a valid key.",
    );
    expect(invalidKey.success).toBeFalsy();
  });
});
