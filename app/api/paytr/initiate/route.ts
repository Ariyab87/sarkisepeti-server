import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function toKurus(priceTl: number) {
  return Math.round(priceTl * 100);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name || "SarkiSepeti User");
    const email = String(body?.email || "test@example.com");
    const productId = String(body?.productId || "");
    const title = String(body?.title || productId);
    const priceTl = Number(body?.priceTl || 0);

    const merchant_id = process.env.PAYTR_MERCHANT_ID || "";
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || "";
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || "";
    if (!merchant_id || !merchant_key || !merchant_salt) {
      return NextResponse.json({ error: "PAYTR credentials missing" }, { status: 500 });
    }

    const url = new URL(req.url);
    const origin = url.origin;

    const user_ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const merchant_oid = `SS-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const payment_amount = toKurus(priceTl);
    const payment_type = "card"; // PayTR Payment Page
    const installment_count = 0;
    const currency = "TL";
    const test_mode = 1;
    const non_3d = 0;

    const okUrl = `${origin}/thank-you?order=${encodeURIComponent(merchant_oid)}`;
    const failUrl = `${origin}/?status=fail&order=${encodeURIComponent(merchant_oid)}`;

    const hash_str = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${payment_type}${installment_count}${currency}${test_mode}${non_3d}${merchant_salt}`;
    const paytr_token = crypto
      .createHmac("sha256", merchant_key)
      .update(hash_str)
      .digest("base64");

    const params = new URLSearchParams({
      merchant_id,
      user_ip,
      merchant_oid,
      email,
      payment_type,
      payment_amount: String(payment_amount),
      currency,
      test_mode: String(test_mode),
      non_3d: String(non_3d),
      merchant_ok_url: okUrl,
      merchant_fail_url: failUrl,
      user_name: name,
      user_address: title,
      user_phone: "0000000000",
      paytr_token,
      no_installment: "1",
      max_installment: "1",
      debug_on: "1",
      lang: "tr",
    });

    // In test/sandbox, PayTR expects a token via /odeme/api/get-token
    // We return token so the client can POST it to their secure page.
    const resp = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      cache: "no-store",
    });

    const data = await resp.json().catch(() => ({} as any));
    if (!resp.ok || !data?.status) {
      return NextResponse.json({ error: data?.reason || "PayTR error" }, { status: 500 });
    }

    return NextResponse.json({ token: data.token });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}


