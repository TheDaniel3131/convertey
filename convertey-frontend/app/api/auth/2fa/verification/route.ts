import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";

interface VerifyRequest {
  token: string;
  secret: string;
}

interface VerifyResponse {
  verified: boolean;
  message?: string;
}

interface ErrorResponse {
  error: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<VerifyResponse | ErrorResponse>> {
  try {
    const body: VerifyRequest = await request.json();
    const { token, secret } = body;

    if (!token || !secret) {
      return NextResponse.json(
        { error: "Token and secret are required" },
        { status: 400 }
      );
    }

    // Verify the token
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
      window: 2, // Allow some time drift
    });

    if (verified) {
      return NextResponse.json({
        verified: true,
        message: "Token verified successfully",
      });
    } else {
      return NextResponse.json({
        verified: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.error("2FA verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify token" },
      { status: 500 }
    );
  }
}
