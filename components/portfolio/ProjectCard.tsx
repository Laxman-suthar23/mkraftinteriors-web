"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden card-hover h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="image-overlay" />
          {project.featured && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1 flex-1">
              {project.title}
            </h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded ml-2 flex-shrink-0">
              {project.type}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3">
            {project.location}
          </p>
          
          <p className="text-sm line-clamp-2 mb-4 flex-1">
            {project.description}
          </p>
          
          <Link href={`/portfolio/${project.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="group-hover:text-primary p-0 h-auto w-full justify-start"
            >
              View Project
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
