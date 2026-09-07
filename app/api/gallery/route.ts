import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { cloudinary, cloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

const FOLDER = "paradise-cafe/gallery";

function asGalleryItem(resource: any) {
  const publicId = String(resource.public_id || "");
  const title = publicId.split("/").pop()?.replace(/[_-]+/g, " ") || "Dokumentasi Paradise";
  const url = String(resource.secure_url || cloudinary.url(publicId, { secure: true, resource_type: "image" }));
  return {
    id: publicId,
    image_url: url,
    title,
    caption: "Dokumentasi Paradise Cafe & Billiard",
    created_at: resource.created_at || null,
  };
}

export async function GET() {
  if (!cloudinaryConfigured()) return NextResponse.json({ items: [], configured: false });
  try {
    const result = await cloudinary.api.resources({ type: "upload", resource_type: "image", prefix: FOLDER, max_results: 100, direction: "desc" });
    return NextResponse.json({ items: (result.resources || []).map(asGalleryItem), configured: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Galeri belum dapat dimuat." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Anda belum login sebagai admin." }, { status: 401 });
  if (!cloudinaryConfigured()) return NextResponse.json({ error: "Cloudinary belum dikonfigurasi." }, { status: 500 });

  const form = await request.formData();
  const files = form.getAll("files").filter((value): value is File => value instanceof File);
  if (!files.length) return NextResponse.json({ error: "Tidak ada foto yang dipilih." }, { status: 400 });

  const uploaded = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: `${file.name} lebih dari 8MB.` }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80) || "foto";
    const publicId = `${FOLDER}/${Date.now()}-${baseName}`;

    const item = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ public_id: publicId, resource_type: "image", overwrite: false, folder: undefined }, (error, result) => {
        if (error) reject(error); else resolve(result);
      });
      stream.end(buffer);
    });
    uploaded.push(asGalleryItem(item));
  }

  return NextResponse.json({ items: uploaded });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Anda belum login sebagai admin." }, { status: 401 });
  if (!cloudinaryConfigured()) return NextResponse.json({ error: "Cloudinary belum dikonfigurasi." }, { status: 500 });
  const body = await request.json().catch(() => ({}));
  const publicId = String(body.public_id || "");
  if (!publicId.startsWith(`${FOLDER}/`)) return NextResponse.json({ error: "Foto tidak valid." }, { status: 400 });
  await cloudinary.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
  return NextResponse.json({ ok: true });
}
