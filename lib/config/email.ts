export const emailConfig = {
  from: {
    default: "Karni Interiors <noreply@karniinteriors.com>",
    contact: "Karni Interiors <contact@karniinteriors.com>",
    welcome: "Karni Interiors <welcome@karniinteriors.com>",
    noreply: "Karni Interiors <noreply@karniinteriors.com>",
  },
  templates: {
    contactForm: "contact-form",
    welcome: "welcome",
    projectInquiry: "project-inquiry",
  },
  subjects: {
    contactForm: (name: string) => `New Contact Form Submission from ${name}`,
    welcome: "Welcome to Karni Interiors!",
    projectInquiry: (projectTitle: string) => `Project Inquiry: ${projectTitle}`,
  },
} as const;
