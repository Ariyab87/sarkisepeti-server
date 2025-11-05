import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve static HTML files
app.use(express.static(__dirname));

// Route for thank-you page
app.get("/thank-you", (req, res) => {
  res.sendFile(join(__dirname, "thank-you.html"));
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("📨 Received form data:", req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Şarkı Sepeti" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New message from ${name}`,
      text: `From: ${email}\n\nMessage:\n${message}`,
    });

    console.log("✅ Email sent successfully");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Visit http://localhost:${port} to view the form`);
});
