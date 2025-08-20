import { ContactFormData, ContactSubmission } from "@/types/contact";
import { emailService } from "./emailService";

class ContactService {
  private baseUrl = "/api/contact";

  async submitContactForm(data: ContactFormData): Promise<ContactSubmission> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      const result = await response.json();
      
      // Send notification email
      await this.sendNotificationEmail(data);
      
      return result;
    } catch (error) {
      console.error("Contact form submission error:", error);
      throw error;
    }
  }

  async getContacts(): Promise<ContactSubmission[]> {
    try {
      const response = await fetch(this.baseUrl);
      
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }

  async getContactById(id: string): Promise<ContactSubmission> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch contact");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching contact:", error);
      throw error;
    }
  }

  async updateContactStatus(id: string, status: string): Promise<ContactSubmission> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact status");
      }

      return response.json();
    } catch (error) {
      console.error("Error updating contact status:", error);
      throw error;
    }
  }

  async deleteContact(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  }

  private async sendNotificationEmail(data: ContactFormData): Promise<void> {
    try {
      const emailContent = {
        to: "admin@karniinteriors.com",
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `,
      };

      await emailService.sendEmail(emailContent);

      // Send confirmation email to user
      const confirmationEmail = {
        to: data.email,
        subject: "Thank you for contacting Karni Interiors",
        html: `
          <h2>Thank you for your inquiry!</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for reaching out to Karni Interiors. We have received your inquiry about ${data.projectType} and will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to browse our portfolio at <a href="${process.env.NEXTAUTH_URL}/portfolio">our website</a>.</p>
          <br>
          <p>Best regards,<br>The Karni Interiors Team</p>
          <hr>
          <p><small>This is an automated confirmation email. Please do not reply to this message.</small></p>
        `,
      };

      await emailService.sendEmail(confirmationEmail);
    } catch (error) {
      console.error("Error sending notification email:", error);
      // Don't throw error here to avoid blocking the main contact submission
    }
  }

  async getContactStats(): Promise<{
    total: number;
    new: number;
    contacted: number;
    closed: number;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch contact stats");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching contact stats:", error);
      throw error;
    }
  }

  async exportContacts(format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/export?format=${format}`);
      
      if (!response.ok) {
        throw new Error("Failed to export contacts");
      }

      return response.blob();
    } catch (error) {
      console.error("Error exporting contacts:", error);
      throw error;
    }
  }
}

export const contactService = new ContactService();
