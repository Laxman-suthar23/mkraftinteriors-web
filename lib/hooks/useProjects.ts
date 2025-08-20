import { useState, useEffect, useCallback } from "react";
import { Project } from "@/types";

interface UseProjectsOptions {
  featured?: boolean;
  type?: string;
  limit?: number;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (options.featured) params.append("featured", "true");
      if (options.type) params.append("type", options.type);
      if (options.limit) params.append("limit", options.limit.toString());

      const response = await fetch(`/api/projects?${params}`);

      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [options.featured, options.type, options.limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const refetch = () => {
    setError(null);
    fetchProjects();
  };

  return { projects, loading, error, refetch };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${id}`);

      if (!response.ok) throw new Error("Failed to fetch project");

      const data = await response.json();
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return { project, loading, error, refetch: fetchProject };
}
