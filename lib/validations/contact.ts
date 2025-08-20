import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Project Type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Optionally export the inferred TypeScript type as well
export type ContactFormData = z.infer<typeof ContactSchema>;
