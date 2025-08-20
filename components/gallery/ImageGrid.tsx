"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Grid, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lightbox from "./Lightbox";

interface ImageGridProps {
  images: { src: string; projectTitle: string; projectId: string }[];
  loading?: boolean;
}

export default function ImageGrid({ images, loading }: ImageGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`bg-muted rounded-lg break-inside-avoid mb-4 ${
              i % 3 === 0
                ? "aspect-[3/4]"
                : i % 3 === 1
                ? "aspect-square"
                : "aspect-[4/3]"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Gallery</h2>
        <div className="flex items-center border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "masonry" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("masonry")}
            className="h-8 w-8 p-0"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        }
      >
        {images.map((image, index) => (
          <motion.div
            key={`${image.projectId}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`relative group cursor-pointer overflow-hidden rounded-lg ${
              viewMode === "grid"
                ? "aspect-square"
                : "aspect-[3/4] break-inside-avoid mb-4"
            }`}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.projectTitle}
              width={800} // reserve width
              height={1066} // reserve height (3:4 ratio)
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 text-white">
                <p className="font-medium">{image.projectTitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        images={images.map((img) => img.src)}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </>
  );
}
