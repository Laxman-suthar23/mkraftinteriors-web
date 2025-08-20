import { z } from "zod";

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string | null;
  location: string;
  date: string; // ISO string or Date
  client: string;
  type: "Residential" | "Commercial" | "Hospitality";
  featured: boolean;
  images: string[];
  mainImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  fullDescription: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  client: z.string().min(1, "Client is required"),
  type: z.enum(["Residential", "Commercial", "Hospitality"]),
  featured: z.boolean().default(false),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  mainImage: z.string().url("Main image is required"),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;
