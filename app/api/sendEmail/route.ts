import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    console.log("📩 Email API called", { name, email, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    console.log("✅ Email sent successfully");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
