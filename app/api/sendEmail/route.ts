import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 API called with:", body);

    if (!body.email || !body.message) {
      console.error("🚨 Missing email or message");
      return Response.json({ success: false, error: "Missing fields" });
    }

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
      subject: `New message from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
    });

    console.log("✅ Email sent successfully to", process.env.EMAIL_RECEIVER);
    return Response.json({ success: true });
  } catch (error) {
    console.error("❌ Error in sendEmail route:", error);
    return Response.json({ success: false, error: (error as Error).message });
  }
}

export async function GET() {
  console.log("⚠️ GET request to /api/sendEmail - not allowed");
  return new Response("Method Not Allowed", { status: 405 });
}
