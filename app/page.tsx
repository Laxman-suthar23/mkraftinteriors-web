import {HeroSection} from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesOverview from "@/components/home/ServicesOverview";
import TestimonialsPreview from "@/components/home/TestimonialsPreview";
import CallToAction from "@/components/home/CallToAction";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientsSectionHome from "@/components/clients/page";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutPreview />
      <ServicesOverview />
      <FeaturedProjects />
      <TestimonialsPreview />
      <CallToAction />
      {/* <ClientsSectionHome /> */}
      <Footer />
    </>
  );
}