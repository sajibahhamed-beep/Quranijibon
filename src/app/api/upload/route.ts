import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files (JPG, PNG, WebP, etc.) are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const ext = path.extname(originalName) || ".jpg";
    const baseName = path.basename(originalName, ext);
    const uniqueFileName = `${Date.now()}_${baseName}${ext}`;

    // Try Supabase Storage if configured
    if (isSupabaseConfigured) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          const { data, error } = await supabase.storage
            .from("blog-images")
            .upload(uniqueFileName, buffer, {
              contentType: file.type,
              upsert: true,
            });

          if (!error && data) {
            const { data: publicUrlData } = supabase.storage
              .from("blog-images")
              .getPublicUrl(data.path);

            if (publicUrlData?.publicUrl) {
              return NextResponse.json({
                success: true,
                url: publicUrlData.publicUrl,
              });
            }
          }
        }
      } catch (storageErr) {
        console.warn("Supabase storage upload failed, falling back to local storage:", storageErr);
      }
    }

    // Save to local public/uploads directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, uniqueFileName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
