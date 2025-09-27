"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Lightbox from "@/components/gallery/Lightbox";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.id);
    };

    getParams();
  }, [params]);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading || !projectId) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20">
          <div className="container py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-8" />
              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div className="aspect-square bg-muted rounded" />
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link href="/portfolio">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
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
        {/* Back Button */}
        <section className="py-8">
          <div className="container">
            <Link href="/portfolio">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </section>

        {/* Main Content: Image and Project Details */}
        <section className="mb-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Main Image - Square */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
              </motion.div>

              {/* Project Description and Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center space-y-8"
              >
                {/* Project Title and Location */}
                <div>
                  <h1 className="heading-2 mb-3">{project.title}</h1>
                  <p className="text-lg text-muted-foreground mb-6">{project.location}</p>
                </div>

                {/* Project Overview */}
                <div>
                  <h2 className="heading-3 mb-4">Project Overview</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {project.fullDescription && (
                    <p className="text-muted-foreground leading-relaxed">
                      {project.fullDescription}
                    </p>
                  )}
                </div>

                {/* Project Info Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                      Project Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Completed</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(project.date)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Location</div>
                          <div className="text-xs text-muted-foreground">
                            {project.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Client</div>
                          <div className="text-xs text-muted-foreground">
                            {project.client}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <ExternalLink className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Type</div>
                          <div className="text-xs text-muted-foreground">
                            {project.type}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <Link href="/contact">
                        <Button className="w-full">Start Your Project</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image Gallery - Below both sections */}
        {project.images.length > 1 && (
          <section className="mb-16">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="heading-3 mb-8">Project Gallery</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {project.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Lightbox */}
        <Lightbox
          images={project.images}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={lightboxIndex}
        />
      </main>
      <Footer />
    </>
  );
}