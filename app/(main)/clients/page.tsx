// components/ClientsSection.tsx

import ClientsSectionHome from "@/components/clients/page";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ClientsSection() {
  return (
    <>
      <Header />
      <ClientsSectionHome />
      <Footer />
    </>
  );
}
