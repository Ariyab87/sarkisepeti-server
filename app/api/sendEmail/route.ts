import nodemailer from "nodemailer";

export async function POST(req: Request) {
  console.log("📩 API endpoint /api/sendEmail triggered");
  try {
    const body = await req.json();
    console.log("🟢 Email body received:", body);

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
  console.log("⚠️ GET /api/sendEmail called (not allowed)");
  return new Response("Method Not Allowed", { status: 405 });
}
