"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import { WhatsappIcon } from '@/components/Watsappicon';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would integrate with your actual form submission API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Success - you can add toast notification here
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        alert('Message sent successfully! We\'ll get back to you within 24 hours.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: ['Pune, Maharashtra, India - 412205'],
      action: 'Get Directions',
      link: 'https://goo.gl/maps/WF3Pe8x99ZUHLcYf9',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 992290 7176'],
      action: 'Call Now',
      link: 'tel:+919922907176',
    },
    {
      icon: WhatsappIcon,
      title: 'Watsapp Us',
      details: ['+91 86009 07176'],
      action: 'Watsapp Now',
      link: 'https://wa.me/8600907176',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['admin@mkraftinteriors.com','  '],
      action: 'Send Email',
      link: 'mailto:hello@mkraftinteriors.com',
    },
  ];

  const services = [
    'Residential Crafting',
    'Commercial Build-outs',
    'Space Planning & Construction',
    'Custom Millwork',
    'Furniture & Installation',
    'Project Execution',
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden pt-16">
        {/* Hero Section */}
        <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Get In <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
                Ready to transform your space? We'd love to hear about your project and discuss how 
                we can craft your vision into reality. Contact us today for a free consultation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Let's <span className="text-gradient">Connect</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Choose the most convenient way to reach us. We're here to answer your questions 
                and help you get started on your interior crafting journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full shadow-card hover-lift group">
                    <CardContent className="p-8 text-center">
                      <motion.div 
                        className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <info.icon className="h-8 w-8 text-accent" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                        {info.title}
                      </h3>
                      <div className="space-y-2 mb-6">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                      {info.link.startsWith('http') || info.link.startsWith('tel:') || info.link.startsWith('mailto:') ? (
                        <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                          <Button variant="outline" size="sm" className="btn-ghost hover:shadow-soft">
                            {info.action}
                          </Button>
                        </a>
                      ) : (
                        <Link href={info.link}>
                          <Button variant="outline" size="sm" className="btn-ghost hover:shadow-soft">
                            {info.action}
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-5" style={{ background: 'var(--gradient-subtle)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-elegant bg-card">
                  <ContactForm/>
                </Card>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose Mkraft Interiors?</h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Free Consultation',
                        description: 'We start every project with a complimentary consultation to understand your vision and crafting needs.',
                      },
                      {
                        title: 'Custom Craftsmanship',
                        description: 'Every space is crafted to your unique style, preferences, and functional requirements.',
                      },
                      {
                        title: 'Expert Craftsmen',
                        description: 'Our experienced team brings technical expertise, creativity, and precision craftsmanship to every project.',
                      },
                      {
                        title: 'End-to-End Execution',
                        description: 'From concept to completion, we handle every aspect of crafting and building your interior spaces.',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mt-1">
                          <CheckCircle className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Quick Response Guarantee</h3>
                    <p className="text-muted-foreground mb-4">
                      We understand that time is valuable. That's why we guarantee a response to all inquiries within 24 hours.
                    </p>
                    <div className="flex items-center text-accent font-semibold">
                      <Clock className="h-4 w-4 mr-2" />
                      Response within 24 hours
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="overflow-hidden">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/20"></div>
                    <div className="text-center z-10">
                      <MapPin className="h-12 w-12 text-accent mx-auto mb-2" />
                      <p className="text-foreground font-medium mb-1">Visit Our Studio</p>
                      <p className="text-muted-foreground text-sm">
                        Interactive map will be displayed here
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Begin Your Transformation?
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                Don't wait to create the space of your dreams. Schedule your free consultation today 
                and take the first step towards expertly crafted interiors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/portfolio">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-primary-foreground border-2 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      View Our Work
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Contact;