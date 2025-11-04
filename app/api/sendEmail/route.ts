import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

function buildHtml({ productLabel, entries }: { productLabel: string; entries: [string, string][] }) {
  const rows = entries
    .map(([k, v]) => `<tr><td style="padding:8px;border:1px solid #333;color:#D4AF37;">${k}</td><td style="padding:8px;border:1px solid #333;color:#fff;">${v}</td></tr>`) 
    .join("");
  return `
    <div style="background:#000;padding:24px;font-family:Inter,system-ui,Segoe UI,Roboto,Arial">
      <h2 style="color:#D4AF37;margin:0 0 12px">New Song Order from SarkıSepeti</h2>
      <p style="color:#ccc;margin:0 0 16px">Product: <strong>${productLabel}</strong></p>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const productLabel = String(formData.get("productLabel") || "");
    const productId = String(formData.get("productId") || "");

    // Collect all fields except files
    const entries: [string, string][] = [];
    const attachments: { filename: string; content: Buffer }[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === "productId" || key === "productLabel") continue;
      if (value instanceof File) {
        const arrayBuffer = await value.arrayBuffer();
        attachments.push({ filename: value.name || "attachment", content: Buffer.from(arrayBuffer) });
      } else {
        entries.push([key, String(value)]);
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 465),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const toAddress = process.env.MAIL_TO || "info@sarkisepeti.com";
    const subject = `New Song Order from SarkıSepeti`;

    const html = buildHtml({ productLabel, entries });
    const text = `Product: ${productLabel}\n\n` + entries.map(([k, v]) => `${k}: ${v}`).join("\n");

    const userEmail = entries.find(([k]) => k === "email")?.[1];

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: toAddress,
      subject,
      text,
      html,
      attachments,
    });

    if (userEmail) {
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: userEmail,
        subject: "Thank you! Your song order has been received.",
        text: "Thank you for your order. We will contact you soon.",
        html: `<div style="background:#000;color:#fff;padding:24px;font-family:Inter,system-ui,Segoe UI,Roboto,Arial">`+
              `<h3 style=\"color:#D4AF37;margin:0 0 8px\">Thank you!</h3>`+
              `<p style=\"margin:0;color:#ddd\">Your song order has been received. We will contact you soon.</p>`+
              `</div>`
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("sendEmail error", err);
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}


