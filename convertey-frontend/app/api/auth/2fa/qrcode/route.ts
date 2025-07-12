import QRCode from "qrcode";
import speakeasy from "speakeasy";
import { NextResponse } from "next/server";

interface QRCodeResponse {
  data: string;
  secret: string;
}

interface ErrorResponse {
  error: string;
}

export async function GET(): Promise<
  NextResponse<QRCodeResponse | ErrorResponse>
> {
  try {
    const secret = speakeasy.generateSecret({
      name: "Convertey",
    });

    if (!secret.otpauth_url) {
      return NextResponse.json(
        { error: "Failed to generate secret" },
        { status: 500 }
      );
    }

    const data: string = await QRCode.toDataURL(secret.otpauth_url);

    return NextResponse.json({
      data,
      secret: secret.base32,
    });
  } catch (error) {
    console.error("QR Code generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
