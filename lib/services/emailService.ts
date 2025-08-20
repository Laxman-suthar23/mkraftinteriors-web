import { ContactFormData } from "@/types/contact";

class EmailService {
  sendEmail(emailContent: { to: string; subject: string; html: string; }) {
      throw new Error("Method not implemented.");
  }
  private baseUrl = "/api/email";

  async sendContactForm(data: ContactFormData): Promise<void> {
    const response = await fetch(`${this.baseUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }
  }

  async sendProjectInquiry(data: {
    name: string;
    email: string;
    projectId: string;
    message: string;
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/project-inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send project inquiry");
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/welcome`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    if (!response.ok) {
      throw new Error("Failed to send welcome email");
    }
  }
}

export const emailService = new EmailService();
