import { google } from "googleapis";

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  // STEP 1: No "code"? → Redirect user to Google Consent Screen
  if (!code) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/userinfo.email"
      ],
    });

    return Response.redirect(authUrl, 302);
  }

  // STEP 2: If "code" exists → Exchange it for tokens
  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log("ACCESS TOKEN:", tokens.access_token);
    console.log("REFRESH TOKEN:", tokens.refresh_token);

    const html = `
      <h3>Your Tokens</h3>
      <p><b>Access Token:</b> ${tokens.access_token}</p>
      <p><b>Refresh Token:</b> ${tokens.refresh_token}</p>
      <p>Copy and store your refresh token in Vercel.</p>
    `;

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" }
    });

  } catch (err) {
    console.error("Token error:", err);
    return new Response("Error exchanging code for tokens", { status: 500 });
  }
}
