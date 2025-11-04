import fs from "fs";
import path from "path";
import InspirationalContent from "./InspirationalContent";

export default function InspirationalSection() {
  const imagesDir = path.join(process.cwd(), "public", "images");
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(imagesDir)
      .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
      .sort();
  } catch {
    files = [];
  }

  if (files.length === 0) {
    files = ["photo1.svg", "photo2.svg", "photo3.svg"]; // graceful fallback
  }

  return <InspirationalContent images={files} />;
}


