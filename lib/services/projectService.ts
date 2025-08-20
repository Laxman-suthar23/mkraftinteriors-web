// lib/services/projectService.ts

import { Project } from "@/types/project";
import { ProjectFormData } from "@/types/project";

interface GetProjectsOptions {
  limit?: number;
  offset?: number;
  featured?: boolean;
  type?: string;
}

export async function getProjects(options?: GetProjectsOptions): Promise<Project[]> {
  const params = new URLSearchParams();

  if (options?.limit) params.append("limit", options.limit.toString());
  if (options?.offset) params.append("offset", options.offset.toString());
  if (options?.featured) params.append("featured", "true");
  if (options?.type) params.append("type", options.type);

  const res = await fetch(`/api/projects?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch projects");

  return res.json();
}

async function create(data: ProjectFormData): Promise<Project> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create project");

  return res.json();
}

async function update(id: string, data: ProjectFormData): Promise<Project> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update project");

  return res.json();
}

export const projectService = {
  getProjects,
  create,
  update,
};
