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
              <div className="h-96 bg-muted rounded mb-8" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
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

        {/* Hero Image */}
        <section className="mb-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-[60vh] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="heading-2 mb-2">{project.title}</h1>
                <p className="text-lg opacity-90">{project.location}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Details */}
        <section className="mb-16">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="heading-3 mb-6">Project Overview</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {project.fullDescription && (
                    <div className="prose prose-lg max-w-none">
                      <p className="leading-relaxed">{project.fullDescription}</p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Project Info Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-6">Project Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Completed</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(project.date)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Location</div>
                            <div className="text-sm text-muted-foreground">
                              {project.location}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Client</div>
                            <div className="text-sm text-muted-foreground">
                              {project.client}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <ExternalLink className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Type</div>
                            <div className="text-sm text-muted-foreground">
                              {project.type}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <Link href="/contact">
                          <Button className="w-full">
                            Start Your Project
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        {project.images.length > 1 && (
          <section className="mb-16">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="heading-3 mb-8">Project Gallery</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
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
                    </div>
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