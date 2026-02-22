const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

class UploadService {
  async uploadImage(file: File): Promise<{
    url: string;
    publicId: string;
    width: number;
    height: number;
  }> {
    const validation = this.validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    if (!CLOUD_NAME) {
      throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in .env");
    }
    if (!UPLOAD_PRESET) {
      throw new Error("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not set in .env");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "Mkraft-interiors");

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    console.log("🔼 Uploading to:", uploadUrl);
    console.log("🔼 Preset:", UPLOAD_PRESET);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Cloudinary error response:", data);
      throw new Error(data?.error?.message || `Upload failed (${response.status})`);
    }

    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
    };
  }

  async uploadMultipleImages(files: File[]): Promise<
    { url: string; publicId: string; width: number; height: number }[]
  > {
    return Promise.all(files.map((f) => this.uploadImage(f)));
  }

  validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 25 * 1024 * 1024; // 25MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.some((t) => t === file.type)) {
      return { valid: false, error: "Invalid file type. Please upload JPG, PNG, or WebP images." };
    }
    if (file.size > maxSize) {
      return { valid: false, error: "File too large. Maximum size is 10MB." };
    }
    return { valid: true };
  }
}

export const uploadService = new UploadService();
