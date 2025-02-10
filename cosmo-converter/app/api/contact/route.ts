import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const access_key = process.env.WEB3FORMS_ACCESS_KEY;

    const web3FormsData = new FormData();
    web3FormsData.append("name", name as string);
    web3FormsData.append("email", email as string);
    web3FormsData.append("message", message as string);
    web3FormsData.append("access_key", access_key as string);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: web3FormsData,
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      console.error("Web3Forms Error:", data);
      return NextResponse.json(
        { success: false, error: data.message || "Submission failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
