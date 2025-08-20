export const SITE_CONFIG = {
  name: "Karni Interiors",
  description: "Premium interior design services creating beautiful, functional spaces that reflect your unique lifestyle and personality.",
  url: "https://karniinteriors.com",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/karniinteriors",
    instagram: "https://instagram.com/karniinteriors",
    facebook: "https://facebook.com/karniinteriors",
  },
  contact: {
    email: "info@karniinteriors.com",
    phone: "+91 9845102393",
    address: {
      street: "#19 Karni Interiors, 2nd Main Road, Beside Canara Bank, DLF New Town, Akshaya Nagar",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560068",
    },
  },
  businessHours: {
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM",
    wednesday: "9:00 AM - 6:00 PM",
    thursday: "9:00 AM - 6:00 PM",
    friday: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed",
  },
};

export const PROJECT_TYPES = [
  "Residential",
  "Commercial", 
  "Hospitality",
] as const;

export const CONTACT_STATUS = [
  "new",
  "contacted", 
  "closed",
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};