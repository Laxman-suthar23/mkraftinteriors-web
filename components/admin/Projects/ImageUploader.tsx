"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { uploadService } from "@/lib/services/uploadService";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 10,
  className,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > maxImages) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }

      setUploading(true);
      setUploadingCount(acceptedFiles.length);

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const validation = uploadService.validateImageFile(file);
          if (!validation.valid) {
            throw new Error(validation.error);
          }
          return uploadService.uploadImage(file);
        });

        const results = await Promise.all(uploadPromises);
        const newImageUrls = results.map(result => result.url);
        onImagesChange([...images, ...newImageUrls]);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to upload images. Please try again.");
      } finally {
        setUploading(false);
        setUploadingCount(0);
      }
    },
    [images, maxImages, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    disabled: uploading,
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  return (
    <div className={className}>
      {/* Upload Dropzone */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            } ${uploading ? "pointer-events-none opacity-50" : ""}`}
          >
            <input {...getInputProps()} />
            
            {uploading ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Uploading {uploadingCount} image{uploadingCount !== 1 ? 's' : ''}...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isDragActive
                    ? "Drop images here..."
                    : "Drag & drop images here, or click to select"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Support: JPG, PNG, WebP (Max 10MB each)
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {images.length} / {maxImages} images uploaded
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={image}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                  {index > 0 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => moveImage(index, index - 1)}
                    >
                      ←
                    </Button>
                  )}
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  {index < images.length - 1 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => moveImage(index, index + 1)}
                    >
                      →
                    </Button>
                  )}
                </div>

                {/* Main Image Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Main
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
