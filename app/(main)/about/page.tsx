import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, Target, Heart } from "lucide-react";
import office from "../../../public/images/about/office.jpg";
const teamMembers = [
  {
    name: "Ashok Kumar",
    role: "Founder",
    img: "/images/team/owner.jpg", // Replace with your public folder path or Cloudinary URL
    bio: "Since 2008, Ashok Kumar has been leading interior projects, ensuring every space is crafted with creativity, precision, and lasting quality.",
  },
];


const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for perfection in every project, ensuring the highest standards of craftsmanship and execution.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Our love for interiors drives us to create spaces that truly resonate with our clients' lifestyles.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work closely with our clients throughout the entire process, ensuring their vision comes to life.",
  },
  {
    icon: Award,
    title: "Innovation",
    description:
      "We constantly explore new trends and technologies to bring fresh ideas to every project.",
  },
];


export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="heading-1 mb-6">About Karni Interiors</h1>
              <p className="body-large">
                Founded in 2008, Karni Interiors has been transforming spaces
                and creating beautiful environments that reflect our clients'
                unique personalities and lifestyles.
              </p>
            </div>
          </div>
        </section>
        {/* Mission Section */}
        <section className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="heading-2 mb-6">Our Mission</h2>
                <div className="body-large mb-6">
                  <p>
                    At Karni Interiors, we believe that a well-crafted interior
                    can transform not just spaces, but lives. Our mission is to
                    create interiors that are both beautiful and functional,
                    reflecting the unique personality and lifestyle of each
                    client.
                  </p>
                  <p className="text-muted-foreground mt-5">
                    We approach every project with passion, skill, and attention
                    to detail, ensuring that the final result exceeds
                    expectations and stands the test of time.
                  </p>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={office}
                  alt="Our Design Philosophy"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Our Values</h2>
              <p className="body-large max-w-2xl mx-auto">
                These core values guide everything we do and shape the way we
                approach each project.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* team section  */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Meet Our Team</h2>
              <p className="body-large max-w-2xl mx-auto">
                Our talented team of designers and project managers brings
                decades of combined experience to every project.
              </p>
            </div>
            <div className="grid ">
              {teamMembers.map((member, index) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
