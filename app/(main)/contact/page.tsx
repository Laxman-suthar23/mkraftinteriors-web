import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["#19 Karni Interiors, 2nd main Road, Beside Canara Bank, DLF New Town, Akshaya Nagar.Bangalore, Karnataka, -560068"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 9845102493", "Mon-Fri: 9:00 AM - 6:00 PM"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["karniinteriors9@gmail.com", "We respond within 24 hours"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="heading-1 mb-6">Contact Us</h1>
              <p className="body-large">
                Ready to transform your space? Get in touch with us to discuss
                your project and schedule a consultation.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="heading-3 mb-6">Get In Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    We'd love to hear about your project. Contact us using any of
                    the methods below, and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={info.title}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">{info.title}</h3>
                            {info.details.map((detail, i) => (
                              <p
                                key={i}
                                className="text-muted-foreground text-sm"
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Interactive map will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
