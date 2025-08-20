
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

export * from "./review";
export * from "./project";