import "server-only";

import { cloudflare } from "@/constants/cloudflare";

interface TurnstileVerificationResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("CLOUDFLARE_TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch(cloudflare.turnstile.verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(cloudflare.turnstile.verifyTimeoutMs),
    });

    if (!response.ok) {
      console.error("Turnstile verification request failed:", response.status);
      return false;
    }

    const data = (await response.json()) as TurnstileVerificationResponse;
    if (!data.success) {
      console.error("Turnstile rejected token:", data["error-codes"]);
    }
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}
