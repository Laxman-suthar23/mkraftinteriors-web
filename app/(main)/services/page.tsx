"use client";

import { motion } from 'framer-motion';
import { Award, Users, Clock, Heart, Target, Lightbulb, CheckCircle, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CallToAction from '@/components/home/CallToAction';

const About = () => {
  const stats = [
    { icon: Award, number: '150+', label: 'Projects Built' },
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Clock, number: '10+', label: 'Years Crafting' },
    { icon: Wrench, number: '25+', label: 'Awards Won' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passionate Craftsmanship',
      description: 'We pour our expertise into every project, building spaces that truly reflect quality workmanship and attention to detail.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented Building',
      description: 'Focused on delivering construction results that exceed expectations and transform your space through skilled craftsmanship.',
    },
    {
      icon: Lightbulb,
      title: 'Creative Construction Solutions',
      description: 'Innovative approaches to interior construction challenges, using traditional techniques with modern materials.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Construction Assured',
      description: 'Meticulous attention to construction details ensures every built element meets our exceptionally high standards.',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Site Assessment',
      description: 'We assess your space, discuss construction requirements, and understand your functional needs for the building project.',
      duration: '1-2 days'
    },
    {
      step: '02',
      title: 'Construction Planning',
      description: 'Our team creates detailed construction plans, structural drawings, and material specifications for the build.',
      duration: '1-2 weeks'
    },
    {
      step: '03',
      title: 'Material Procurement',
      description: 'We source quality construction materials, coordinate deliveries, and prepare the site for building work.',
      duration: '2-4 weeks'
    },
    {
      step: '04',
      title: 'Construction & Build',
      description: 'Our skilled craftsmen execute the construction work, building every element with precision and quality control.',
      duration: '1-2 weeks'
    },
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen overflow-x-hidden pt-16">
      {/* Hero Section */}
      <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About <span className="text-gradient">Mkraft Interiors</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We are skilled interior crafters dedicated to building spaces that inspire, function perfectly, and reflect quality workmanship. 
              With over a decade of construction experience, we transform ordinary spaces into extraordinary built environments.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-foreground"
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our <span className="text-gradient">Craft</span>
              </motion.h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                {[
                  "Mkraft Interiors was founded in 2014 with a simple belief: every space has the potential to be expertly crafted. What started as a small construction workshop has grown into a full-service interior building firm, but our core philosophy of quality craftsmanship remains unchanged.",
                  "We believe that great construction is not just about following blueprints or using standard materials. It's about understanding how you live and work, then building spaces that enhance every moment of your daily life through skilled craftsmanship.",
                  "Our team of talented craftsmen brings together diverse backgrounds in construction, carpentry, and interior building, allowing us to approach each project with traditional techniques and innovative construction solutions."
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="/portfolio">
                  <Button className="btn-primary group">
                    View Our Built Work
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-card rounded-2xl p-6 md:p-8 text-center shadow-card hover-lift group"
                >
                  <motion.div 
                    className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-8 w-8 text-accent" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-foreground mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              These core principles guide everything we build, ensuring that every construction project we undertake 
              reflects our commitment to excellence and client satisfaction.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-card rounded-2xl p-8 shadow-card hover-lift group"
              >
                <motion.div 
                  className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <value.icon className="h-8 w-8 text-accent" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
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
              Our Construction <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We follow a proven construction methodology that ensures your building project runs smoothly from planning to completion, 
              keeping you informed and involved throughout the entire construction process.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {process.map((phase, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center group"
              >
                <motion.div 
                  className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6 shadow-card group-hover:shadow-elegant transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {phase.step}
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3">{phase.description}</p>
                <div className="text-sm text-accent font-medium">{phase.duration}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Highlight */}
      <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-elegant">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=500&fit=crop"
                  alt="Mkraft Interiors Craftsmen Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-foreground">
                Meet Our <span className="text-gradient">Expert Craftsmen</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our diverse team of craftsmen, carpenters, and construction specialists work collaboratively 
                to ensure every detail of your building project is executed flawlessly. With combined decades 
                of construction experience, we bring traditional craftsmanship, technical expertise, and passion to every build.
              </p>
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                  "Craftsmanship is not just what it looks like and feels like. Craftsmanship is how it's built. 
                  We create spaces that work beautifully for your life through quality construction."
                </blockquote>
                <footer className="mt-4">
                  <cite className="text-accent font-semibold">— Mkraft Interiors Craftsmen Team</cite>
                </footer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CallToAction />
    </div>
    <Footer/>
    </>
  );
};

export default About;