// app/(main)/page.tsx

import HeroSection from "@/components/home/HeroSection";
import CompanyProfile from "@/components/about/CompanyProfile";
import MissionStatement from "@/components/about/MissionStatement";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import ReviewGrid from "@/components/reviews/ReviewsGrid";
import ContactForm from "@/components/contact/ContactForm";
import { getProjects } from "@/lib/services/projectService";
import { getFeaturedReviews } from "@/lib/services/reviewService";
import { revalidatePath } from "next/cache";

export const revalidate = 60; // Revalidate this page every minute

export default async function HomePage() {
  // Fetch data
  const projects = await getProjects({ limit: 6, offset: 0 });
  const reviews = await getFeaturedReviews(4);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Company Profile */}
      <CompanyProfile />

      {/* Mission & Values */}
      <MissionStatement />

      {/* Featured Projects */}
      <section className="section-padding bg-muted/10">
        <div className="container">
          <h2 className="heading-2 mb-6 text-center">Featured Projects</h2>
          <ProjectGrid projects={projects} loading={!projects.length} />
        </div>
      </section>

      {/* Client Reviews */}
      <section className="section-padding">
        <div className="container">
          <h2 className="heading-2 mb-6 text-center">What Our Clients Say</h2>
          <ReviewGrid reviews={reviews} loading={!reviews.length} />
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-muted/10">
        <div className="container max-w-2xl mx-auto">
          <h2 className="heading-2 mb-6 text-center">Get in Touch</h2>
          {/* @ts-expect-error Server Component */}
          <ContactForm schema={getContactFormSchema()} onSuccess={() => revalidatePath("/")} />
        </div>
      </section>
    </main>
  );
}
