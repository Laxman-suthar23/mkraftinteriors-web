// types/project.ts
import { z } from "zod";

// Base fields for creating or updating a project
export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Short description is required"),
  fullDescription: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  date: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format"
    ),
  client: z.string().min(1, "Client is required"),
  type: z.enum(["Residential", "Commercial", "Hospitality"]),
  featured: z.boolean().optional(),
  images: z
    .array(z.string().url("Image URLs must be valid"))
    .min(1, "At least one image is required"),
  mainImage: z.string().url("Main image must be a valid URL"),
});

// Type inferred for form values
export type ProjectFormData = z.infer<typeof ProjectSchema>;

// Full Project type (e.g., from the database)
export interface Project {
  category: string;
  category: string;
  id: string;
  title: string;
  description: string;
  fullDescription?: string | null;
  location: string;
  date: string; // ISO string
  client: string;
  type: "Residential" | "Commercial" | "Hospitality";
  featured: boolean;
  images: string[];
  mainImage: string;
  createdAt: Date;
  updatedAt: Date;
}
