import { NextRequest, NextResponse } from "next/server";
import { personal } from "@/data/portfolio";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const targetEmail = personal.email || "dhruvisenjaliya05@gmail.com";

    // FormSubmit API call with valid server Referer
    const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://dhruvisenjaliya-portfolio.vercel.app",
        Origin: "https://dhruvisenjaliya-portfolio.vercel.app",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio Contact from ${name}`,
      }),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data?.success !== "false") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: data?.message || "Failed to send email" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
