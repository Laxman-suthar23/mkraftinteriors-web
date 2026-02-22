import { uploadConfig } from "@/lib/config/upload";

class UploadService {
  private getUploadUrl(): string {
    const cloudName = uploadConfig.cloudinary.cloudName;
    if (!cloudName) {
      throw new Error(
        "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. Please add it to your .env.local file."
      );
    }
    return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  }

  async uploadImage(file: File): Promise<{
    url: string;
    publicId: string;
    width: number;
    height: number;
  }> {
    // Validate the file before uploading
    const validation = this.validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const uploadPreset = uploadConfig.cloudinary.uploadPreset;
    if (!uploadPreset) {
      throw new Error(
        "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not set. Please add it to your .env.local file."
      );
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", uploadConfig.cloudinary.folder);

    const response = await fetch(this.getUploadUrl(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.error?.message || `Upload failed with status ${response.status}`
      );
    }

    const result = await response.json();

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  }

  async uploadMultipleImages(files: File[]): Promise<
    {
      url: string;
      publicId: string;
      width: number;
      height: number;
    }[]
  > {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = uploadConfig.limits.fileSize;
    const allowedTypes = [...uploadConfig.limits.allowedTypes];

    if (!allowedTypes.some((type) => type === file.type)) {
      return {
        valid: false,
        error: "Invalid file type. Please upload JPG, PNG, or WebP images.",
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: "File too large. Maximum size is 10MB.",
      };
    }

    return { valid: true };
  }
}

export const uploadService = new UploadService();
