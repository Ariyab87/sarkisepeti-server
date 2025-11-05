import nodemailer from "nodemailer";

export async function POST(req: Request) {
  console.log("📩 API /api/send POST endpoint called");
  try {
    const body = await req.json();
    console.log("🟢 Request body received:", { name: body.name, email: body.email, messageLength: body.message?.length });

    if (!body.name || !body.email || !body.message) {
      console.error("🚨 Missing required fields:", { hasName: !!body.name, hasEmail: !!body.email, hasMessage: !!body.message });
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("🔧 Creating email transporter...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 Sending email from", process.env.EMAIL_USER, "to", process.env.EMAIL_RECEIVER);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New message from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
    });

    console.log("✅ Email sent successfully!");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error in /api/send:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  console.log("⚠️ GET /api/send called (not allowed)");
  return new Response("Method Not Allowed", { status: 405 });
}

