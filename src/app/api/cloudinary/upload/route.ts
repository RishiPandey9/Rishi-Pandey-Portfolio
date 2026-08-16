import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { verifyFirebaseUser } from "@/lib/firebase/server-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await verifyFirebaseUser(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const formData = await request.formData();
  const file = formData.get("file");

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
  }

  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Please upload a valid image" }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Images must be smaller than 8MB" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createHash("sha1")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", apiKey);
  uploadData.append("timestamp", timestamp);
  uploadData.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: uploadData,
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 502 });
  }

  const result = await response.json() as { secure_url?: string };
  if (!result.secure_url) {
    return NextResponse.json({ error: "Cloudinary returned no image URL" }, { status: 502 });
  }

  return NextResponse.json({ url: result.secure_url });
}
