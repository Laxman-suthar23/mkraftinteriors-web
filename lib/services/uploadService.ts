class UploadService {
  private baseUrl = "/api/upload";

  async uploadImage(file: File): Promise<{
    url: string;
    publicId: string;
    width: number;
    height: number;
  }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to upload image");
    }

    return response.json();
  }

  async uploadMultipleImages(files: File[]): Promise<{
    url: string;
    publicId: string;
    width: number;
    height: number;
  }[]> {
    const uploadPromises = files.map(file => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  async deleteImage(publicId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}?publicId=${publicId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }
  }

  validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
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
