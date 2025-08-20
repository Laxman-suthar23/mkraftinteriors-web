"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectDetails from "@/components/portfolio/ProjectDetails";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminProjectViewPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
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

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!project) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link href="/admin/projects">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground">{project.location}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant={project.featured ? "default" : "outline"}>
            {project.featured ? "Featured" : "Standard"}
          </Badge>
          <Link href={`/admin/projects/${project.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Basic Info</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Type:</strong> {project.type}</div>
                <div><strong>Client:</strong> {project.client}</div>
                <div><strong>Date:</strong> {formatDate(project.date)}</div>
                <div><strong>Featured:</strong> {project.featured ? "Yes" : "No"}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Images</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Total Images:</strong> {project.images.length}</div>
                <div><strong>Main Image:</strong> Set</div>
                <Link href={`/portfolio/${project.id}`} target="_blank">
                  <Button variant="outline" size="sm" className="mt-2">
                    View Public Page
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Content */}
      <ProjectDetails project={project} />
      
      {/* Project Gallery */}
      <ProjectGallery images={project.images} title={project.title} />
    </div>
  );
}
