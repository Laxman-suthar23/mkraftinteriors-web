"use client";

import { motion } from 'framer-motion';
import { Award, Users, Clock, Heart, Target, Lightbulb, CheckCircle, Palette, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CallToAction from '@/components/home/CallToAction';

const About = () => {
  const stats = [
    { icon: Award, number: '150+', label: 'Projects Completed' },
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Clock, number: '10+', label: 'Years Experience' },
    { icon: Palette, number: '25+', label: 'Awards Won' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passionate Design',
      description: 'We pour our hearts into every project, creating spaces that truly reflect who you are and how you live.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Focused on delivering results that exceed expectations and transform your lifestyle in meaningful ways.',
    },
    {
      icon: Lightbulb,
      title: 'Creative Solutions',
      description: 'Innovative approaches to space planning and design challenges, tailored specifically to your needs.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assured',
      description: 'Meticulous attention to detail ensures every element meets our exceptionally high standards.',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We start by understanding your vision, lifestyle, and goals for the space.',
      duration: '1-2 days'
    },
    {
      step: '02',
      title: 'Design',
      description: 'Our team creates detailed designs and 3D visualizations of your future space.',
      duration: '1-2 weeks'
    },
    {
      step: '03',
      title: 'Development',
      description: 'We coordinate with contractors and suppliers to bring the design to life.',
      duration: '2-4 weeks'
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Final installation and styling to ensure every detail is perfect.',
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
    <div className="min-h-screen pt-16">
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
              We are passionate interior designers dedicated to creating spaces that inspire, comfort, and reflect your unique personality. 
              With over a decade of experience, we transform ordinary rooms into extraordinary experiences.
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
                Our <span className="text-gradient">Story</span>
              </motion.h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                {[
                  "Mkraft Interiors was founded in 2014 with a simple belief: every space has the potential to be extraordinary. What started as a small design studio has grown into a full-service interior design firm, but our core philosophy remains unchanged.",
                  "We believe that great design is not just about beautiful objects or trendy colors. It's about understanding how you live, work, and dream, then creating spaces that enhance every moment of your daily life.",
                  "Our team of talented designers brings together diverse backgrounds in architecture, fine arts, and interior design, allowing us to approach each project with fresh perspectives and innovative solutions."
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
                    View Our Work
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
              These core principles guide everything we do, ensuring that every project we undertake 
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
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We follow a proven process that ensures your project runs smoothly from concept to completion, 
              keeping you informed and involved every step of the way.
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
                  alt="Mkraft Interiors Team"
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
                Meet Our <span className="text-gradient">Expert Team</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our diverse team of designers, architects, and project managers work collaboratively 
                to ensure every detail of your project is executed flawlessly. With combined decades 
                of experience, we bring creativity, technical expertise, and passion to every project.
              </p>
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                  "Design is not just what it looks like and feels like. Design is how it works. 
                  We create spaces that work beautifully for your life."
                </blockquote>
                <footer className="mt-4">
                  <cite className="text-accent font-semibold">— Mkraft Interiors Team</cite>
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