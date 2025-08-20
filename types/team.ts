import { z } from "zod";

export const TeamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  image: z.string().url("Must be a valid URL"),
  order: z.number().min(1),
  active: z.boolean().default(true),
});

export type TeamMemberFormData = z.infer<typeof TeamMemberSchema>;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
