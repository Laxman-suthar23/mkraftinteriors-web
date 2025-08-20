"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";

interface ProjectNavigationProps {
  currentProject: Project;
  allProjects: Project[];
}

export default function ProjectNavigation({
  currentProject,
  allProjects,
}: ProjectNavigationProps) {
  const currentIndex = allProjects.findIndex(p => p.id === currentProject.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  if (!prevProject && !nextProject) {
    return null;
  }

  return (
    <div className="flex justify-between items-center py-8 border-t">
      {prevProject ? (
        <Link href={`/portfolio/${prevProject.id}`}>
          <Button variant="ghost" className="flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="font-medium">{prevProject.title}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextProject ? (
        <Link href={`/portfolio/${nextProject.id}`}>
          <Button variant="ghost" className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="font-medium">{nextProject.title}</div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
