// types/contact.ts

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}
