export const uploadConfig = {
  cloudinary: {
    folder: "karni-interiors",
    transformation: [
      { width: 1920, height: 1080, crop: "limit", quality: "auto" },
      { format: "webp" },
    ],
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  },
  validation: {
    minWidth: 300,
    minHeight: 300,
    maxWidth: 5000,
    maxHeight: 5000,
  },
} as const;

export const validateImageFile = (file: File) => {
  const { fileSize, allowedTypes } = uploadConfig.limits;
  
  if (file.size > fileSize) {
    return { valid: false, error: "File too large. Maximum size is 10MB." };
  }
  
  if (!allowedTypes.some(type => type === file.type)) {
    return { valid: false, error: "Invalid file type. Please upload JPG, PNG, or WebP images." };
  }
  
  return { valid: true };
};
