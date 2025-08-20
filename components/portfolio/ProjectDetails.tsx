"use client";

import Image from "next/image";
import { Calendar, MapPin, User, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-12">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <h2 className="heading-3 mb-6">Project Overview</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {project.description}
        </p>
        
        {project.fullDescription && (
          <div className="prose prose-lg max-w-none">
            <p className="leading-relaxed">{project.fullDescription}</p>
          </div>
        )}
      </div>

      {/* Project Info Sidebar */}
      <div className="lg:col-span-1">
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
                <Building className="h-5 w-5 text-muted-foreground" />
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
      </div>
    </div>
  );
}
