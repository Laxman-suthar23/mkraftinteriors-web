"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  client: string;
  type: 'RESIDENTIAL' | 'COMMERCIAL' | 'HOSPITALITY' | 'OFFICE' | 'RETAIL';
  featured: boolean;
  images: string[];
  mainImage: string;
  createdAt: string;
  updatedAt: string;
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        // Get first 3 projects (or filter featured if needed)
        const featuredProjects = data.slice(0, 3);
        setProjects(featuredProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-64 mx-auto mb-4" />
            <div className="skeleton h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton h-96 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our latest interior projects that showcase our commitment
            to creating functional, visually stunning spaces tailored to each
            client's unique vision and lifestyle.
          </p>
        </motion.div>

        {projects.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="bg-card rounded-2xl p-12 max-w-2xl mx-auto shadow-card">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                No Featured Projects Yet
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We're currently updating our portfolio with exciting new projects. 
                Check back soon to see our latest work!
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Link href={`/portfolio/${project.id}`} className="block">
                  <Card className="group overflow-hidden rounded-2xl shadow-card hover-lift bg-card cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-soft">
                          {project.type.charAt(0).toUpperCase() + project.type.slice(1).toLowerCase()}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-8">
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          {project.location}
                        </p>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center text-accent hover:text-accent font-semibold group/btn">
                        View Project Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-accent/10 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Explore Our Complete Portfolio
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              See how we've transformed spaces across residential, commercial, and hospitality projects 
              with our innovative design approach and attention to detail.
            </p>
            <Link href="/portfolio">
              <Button size="lg" className="btn-primary">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}