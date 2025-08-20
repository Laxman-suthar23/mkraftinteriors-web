"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Lightbox from "@/components/gallery/Lightbox";
import Image from "next/image";
import { Project } from "@/types";

export default function GalleryPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allImages, setAllImages] = useState<{ src: string; projectTitle: string; projectId: string }[]>([]);
  const [filteredImages, setFilteredImages] = useState<{ src: string; projectTitle: string; projectId: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
        
        // Extract all images from all projects
        const images = data.flatMap((project: Project) =>
          project.images.map((image: string) => ({
            src: image,
            projectTitle: project.title,
            projectId: project.id,
            projectType: project.type,
          }))
        );
        
        setAllImages(images);
        setFilteredImages(images);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = allImages;

    // Filter by project type
    if (selectedType !== "all") {
      const projectsOfType = projects.filter(p => p.type === selectedType);
      const projectIds = projectsOfType.map(p => p.id);
      filtered = filtered.filter(image => projectIds.includes(image.projectId));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(image =>
        image.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredImages(filtered);
  }, [allImages, projects, selectedType, searchTerm]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const projectTypes = ["all", "Residential", "Commercial", "Hospitality"];

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20">
          <div className="container py-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="heading-1 mb-6">Gallery</h1>
              <p className="body-large">
                Browse through our extensive collection of interior design
                inspirations from completed projects across various styles and spaces.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by project name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  {filteredImages.length} image{filteredImages.length !== 1 ? "s" : ""}
                </div>
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
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Images Gallery */}
        <section className="section-padding">
          <div className="container">
            {filteredImages.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No images found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            ) : (
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
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={`${image.projectId}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                      viewMode === "grid" ? "aspect-square" : "break-inside-avoid mb-4"
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.projectTitle}
                      width={400}
                      height={viewMode === "grid" ? 400 : 400}
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
            )}
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox
          images={filteredImages.map(img => img.src)}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={lightboxIndex}
        />
      </main>
      <Footer />
    </>
  );
}
