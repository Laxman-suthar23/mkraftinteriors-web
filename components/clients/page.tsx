// components/ClientsSection.tsx

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const clients = [
  {
    name: "Godrej",
    logo: "/images/clients/godrej.jpeg",
  },
  {
    name: "Beijing Bites (Vrushadri Construction LLP)",
    logo: "/images/clients/Beijing Bites.png",
  },
  {
    name: "Nexa Maruti Suzuki (Vrushadri Construction LLP)",
    logo: "/images/clients/Nexa Maruti Suzuki.jpeg",
  },
  {
    name: "True Value (Vrushadri Construction LLP)",
    logo: "/images/clients/True Value.png", // or .jpeg (you had both, pick one)
  },
  {
    name: "Mandovi Motors (Vrushadri Construction LLP)",
    logo: "/images/clients/Mandovi Motors.jpeg", // maybe rename this to avoid confusion
  },
  {
    name: "Waters (Vrushadri Construction LLP)",
    logo: "/images/clients/Waters.png",
  },
  {
    name: "Arvind Motors (Vrushadri Construction LLP)",
    logo: "/images/clients/Arvind Motors.jpeg",
  },
  {
    name: "Arena (Vrushadri Construction LLP)",
    logo: "/images/clients/Arena.png",
  },
  {
    name: "Sherwood Suits Service Apartment",
    logo: "/images/clients/sherwood suites service apartments.jpg",
  },
  {
    name: "Sri Balaji Construction",
    logo: "/images/clients/Sri Balaji Construction.jpeg",
  },
];
export default function ClientsSectionHome() {
  return (
      <section className="max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Clients</h2>
        <p className="mb-10 text-center text-gray-600 text-lg">
          We are proud to have worked with these esteemed clients:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.map((c) => (
            <div
              key={c.name}
              className="bg-white p-4 rounded shadow w-full flex flex-col items-center"
            >
              <img
                src={c.logo}
                className="h-20 w-auto object-contain mb-2"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
  );
}
