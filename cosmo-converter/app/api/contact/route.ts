// app/api/contact/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract form data
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    // const files = formData
    //   .getAll("files")
    //   .filter((file) => (file as File).size <= 5 * 1024 * 1024); // Limit file size to 5MB
    const access_key = process.env.WEB3FORMS_ACCESS_KEY;

    // Prepare data for Web3Forms
    const web3FormsData = new FormData();
    web3FormsData.append("access_key", access_key as string);
    web3FormsData.append("name", name as string);
    web3FormsData.append("email", email as string);
    web3FormsData.append("message", message as string);

    // Add attachments if any
    // files.forEach((file, index) => {
    //   web3FormsData.append(`attachments[${index}]`, file);
    // });

    // Add additional parameters for better email formatting
    web3FormsData.append("subject", "New Contact Form Submission");
    web3FormsData.append("from_name", "CosmoConverter Contact Form");
    web3FormsData.append("reply_to", email as string);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: web3FormsData,
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        data: {
          ...data,
          // attachments: files.map((file) => ({
          //   name: (file as File).name,
          //   type: (file as File).type,
          //   size: (file as File).size,
          // })),
        },
      });
    } else {
      console.error("Web3Forms Error:", data);
      return NextResponse.json(
        {
          success: false,
          error: data.message || "Submission failed",
          details: data.errors,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
