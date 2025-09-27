"use client";

import { motion } from 'framer-motion';
import { Home, Building2, Palette, Layout, ShoppingBag, Wrench, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CallToAction from '@/components/home/CallToAction';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Design',
      description: 'Complete home transformations from concept to completion. We create living spaces that reflect your personality and enhance your daily life.',
      features: ['Living Room Design', 'Bedroom Makeovers', 'Kitchen Renovations', 'Bathroom Remodeling', 'Home Office Setup', 'Outdoor Spaces'],
      popular: false
    },
    {
      icon: Building2,
      title: 'Commercial Design',
      description: 'Professional spaces that inspire productivity and leave lasting impressions on clients and employees.',
      features: ['Office Design', 'Retail Spaces', 'Restaurant Interiors', 'Hotel Design', 'Co-working Spaces', 'Reception Areas'],
      popular: false
    },
    {
      icon: Layout,
      title: 'Space Planning',
      description: 'Optimize your space with strategic planning that maximizes functionality while maintaining aesthetic appeal.',
      features: ['Layout Optimization', 'Traffic Flow Analysis', 'Storage Solutions', 'Multi-purpose Areas', '3D Visualization', 'Feng Shui Principles'],
      popular: false
    },
    {
      icon: Palette,
      title: 'Color Consultation',
      description: 'Expert color schemes that create the perfect mood and atmosphere for every room in your space.',
      features: ['Color Psychology', 'Paint Selection', 'Accent Colors', 'Seasonal Updates', 'Lighting Coordination', 'Material Matching'],
      popular: false
    },
    {
      icon: ShoppingBag,
      title: 'Furniture & Decor',
      description: 'Curated selection of furniture and accessories that perfectly complement your design vision.',
      features: ['Custom Furniture', 'Art Curation', 'Lighting Design', 'Textile Selection', 'Accessory Styling', 'Window Treatments'],
      popular: false
    },
    {
      icon: Wrench,
      title: 'Project Management',
      description: 'End-to-end project coordination ensuring your design comes to life on time and within budget.',
      features: ['Timeline Management', 'Contractor Coordination', 'Quality Control', 'Budget Oversight', 'Progress Reporting', 'Final Installation'],
      popular: false
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'We meet to discuss your vision, needs, and budget. This consultation helps us understand your style preferences and project requirements.',
      duration: '1-2 hours'
    },
    {
      step: '02',
      title: 'Design Development',
      description: 'Our team creates detailed design concepts, mood boards, and 3D visualizations to bring your vision to life.',
      duration: '1-2 weeks'
    },
    {
      step: '03',
      title: 'Material Selection',
      description: 'We help you choose the perfect materials, finishes, furniture, and accessories that align with your design and budget.',
      duration: '1 week'
    },
    {
      step: '04',
      title: 'Implementation',
      description: 'We coordinate with contractors and suppliers to execute the design, managing every detail from start to finish.',
      duration: '4-8 weeks'
    }
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
    <Header/>    
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our <span className="text-gradient">Services</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-white max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From complete home makeovers to commercial space design, we offer comprehensive interior design services 
              tailored to transform your space into something extraordinary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
              What We <span className="text-gradient">Offer</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose from our range of specialized services, each designed to address specific aspects 
              of interior design and space transformation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
                className={`relative bg-card rounded-2xl p-8 shadow-card hover-lift group border-2 transition-all duration-300 ${
                  service.popular ? 'border-accent shadow-elegant' : 'border-transparent hover:border-accent/20'
                }`}
              >
                {service.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                  </motion.div>
                )}

                <div className="mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="h-8 w-8 text-accent" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className={`w-full group/btn transition-all duration-300 ${
                    service.popular ? 'btn-accent' : 'btn-primary'
                  }`}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
                className="bg-card rounded-2xl p-6 shadow-card text-center hover-lift group"
              >
                <motion.div 
                  className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6 group-hover:shadow-elegant transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {phase.step}
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {phase.description}
                </p>
                <div className="flex items-center justify-center text-sm text-accent font-medium">
                  <Clock className="h-4 w-4 mr-2" />
                  {phase.duration}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction />
    </div>
    <Footer/>
    </>
  );
};

export default Services;