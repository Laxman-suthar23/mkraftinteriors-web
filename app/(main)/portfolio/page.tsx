"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import CallToAction from "@/components/home/CallToAction";

// PortfolioCard Component
const PortfolioCard = ({ project }: { project: Project }) => (
  <Link href={`/portfolio/${project.id}`}>
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
        
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-soft">
              Featured
            </span>
          </div>
        )}
        
        <div className="absolute top-4 right-4">
          <span className="bg-primary/80 text-primary-foreground px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
            {project.type.charAt(0) + project.type.slice(1).toLowerCase()}
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
);

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16">
          <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-8">
                <div className="skeleton h-16 w-96 mx-auto rounded-lg" />
                <div className="skeleton h-6 w-[800px] mx-auto rounded-lg" />
              </div>
            </div>
          </section>
          
          <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-2xl" />
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
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Our <span className="text-gradient">Portfolio</span>
              </h1>
              <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
                Explore our collection of stunning interior design projects that showcase our commitment 
                to creating beautiful, functional spaces that reflect our clients' unique personalities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {projects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Coming Soon</h3>
                <p className="text-muted-foreground mb-8">
                  We're currently updating our portfolio with exciting new projects. 
                  Check back soon to see our latest work!
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
{projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <PortfolioCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '150+', label: 'Projects Completed' },
                { number: '500+', label: 'Happy Clients' },
                { number: '25+', label: 'Awards Won' },
                { number: '10+', label: 'Years Experience' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}