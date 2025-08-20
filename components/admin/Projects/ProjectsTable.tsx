"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";
import ProjectActions from "./ProjectActions";

interface ProjectsTableProps {
  projects: Project[];
  onUpdate: () => void;
}

export default function ProjectsTable({ projects, onUpdate }: ProjectsTableProps) {
  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Residential": return "default";
      case "Commercial": return "secondary";
      case "Hospitality": return "outline";
      default: return "outline";
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold mb-2">No projects found</h3>
        <p className="text-muted-foreground mb-4">
          Create your first project to get started.
        </p>
        <Link href="/admin/projects/new">
          <Button>Create Project</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div className="relative w-16 h-12 rounded overflow-hidden">
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Link 
                    href={`/admin/projects/${project.id}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {project.title}
                  </Link>
                  {project.featured && (
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {project.location}
              </TableCell>
              <TableCell>
                <Badge variant={getTypeBadgeVariant(project.type)}>
                  {project.type}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {project.client}
              </TableCell>
              <TableCell>
                <Badge variant={project.featured ? "default" : "outline"}>
                  {project.featured ? "Featured" : "Standard"}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(project.date)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Link href={`/portfolio/${project.id}`} target="_blank">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <ProjectActions project={project} onUpdate={onUpdate} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
