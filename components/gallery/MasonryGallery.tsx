"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";

interface MasonryGalleryProps {
  images: { src: string; projectTitle: string; projectId: string }[];
  columns?: number;
}

export default function MasonryGallery({ images, columns = 4 }: MasonryGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imageColumns, setImageColumns] = useState<Array<Array<typeof images[0]>>>([]);

  useEffect(() => {
    // Distribute images across columns for masonry layout
    const cols: Array<Array<typeof images[0]>> = Array.from({ length: columns }, () => []);
    
    images.forEach((image, index) => {
      const shortestCol = cols.reduce((prev, current, currentIndex) => {
        const prevHeight = prev.reduce((sum) => sum + 300, 0); // Estimate height
        const currentHeight = current.reduce((sum) => sum + 300, 0);
        return prevHeight <= currentHeight ? prev : current;
      });
      
      const colIndex = cols.indexOf(shortestCol);
      cols[colIndex].push(image);
    });
    
    setImageColumns(cols);
  }, [images, columns]);

  const openLightbox = (globalIndex: number) => {
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
  };

  const getGlobalIndex = (colIndex: number, imageIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < colIndex; i++) {
      globalIndex += imageColumns[i]?.length || 0;
    }
    globalIndex += imageIndex;
    return globalIndex;
  };

  return (
    <>
      <div className="flex gap-4">
        {imageColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 space-y-4">
            {column.map((image, imageIndex) => {
              const globalIndex = getGlobalIndex(colIndex, imageIndex);
              return (
                <motion.div
                  key={`${image.projectId}-${imageIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: globalIndex * 0.05 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => openLightbox(globalIndex)}
                >
                  <Image
                    src={image.src}
                    alt={image.projectTitle}
                    width={400}
                    height={300 + Math.random() * 200} // Random height for masonry
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="font-medium">{image.projectTitle}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      <Lightbox
        images={images.map(img => img.src)}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </>
  );
}
