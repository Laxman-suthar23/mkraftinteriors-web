"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadService } from "@/lib/services/uploadService";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: Dispatch<SetStateAction<string[]>>;
  maxImages?: number;
}

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 50,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setErrorMessage(`You can upload a maximum of ${maxImages} images.`);
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    try {
      const uploadPromises = files.map(async (file) => {
        try {
          const result = await uploadService.uploadImage(file);
          return result.url;
        } catch (err) {
          console.error("❌ Upload failed for", file.name, err);
          return null;
        }
      });

      const newUrls = (await Promise.all(uploadPromises)).filter(
        Boolean
      ) as string[];

      if (newUrls.length === 0) {
        setErrorMessage("No images were uploaded. Please try again.");
        return;
      }

      onImagesChange((prev) => {
        const all = [...prev, ...newUrls];
        if (prev.length === 0) setMainImageIndex(0);
        return all;
      });

      // Reset input
      e.target.value = "";
    } catch (error) {
      console.error("❌ Error uploading images:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to upload images. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onImagesChange((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (mainImageIndex === index) {
        setMainImageIndex(updated.length > 0 ? 0 : -1);
      } else if (mainImageIndex > index) {
        setMainImageIndex((m) => m - 1);
      }
      return updated;
    });
  };

  const handleSetMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
        {isUploading ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Uploading images to Cloudinary...
            </p>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Upload project images (JPG, PNG up to 10MB each)
            </p>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          hidden
          id="image-upload"
          disabled={isUploading}
        />
        <Button
          type="button"
          onClick={() => document.getElementById("image-upload")?.click()}
          variant="outline"
          disabled={isUploading || images.length >= maxImages}
        >
          {isUploading ? "Uploading..." : "Choose Images"}
        </Button>
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Upload ${index + 1}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {index === mainImageIndex && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Main
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => handleSetMainImage(index)}
                disabled={index === mainImageIndex}
              >
                {index === mainImageIndex ? "Main Image" : "Set as Main"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
