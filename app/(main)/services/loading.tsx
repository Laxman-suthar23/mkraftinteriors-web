"use client";

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ServicesLoading = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-16">
        {/* Hero Section Skeleton */}
        <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="skeleton h-16 w-96 mx-auto rounded-lg" />
              <div className="skeleton h-6 w-[800px] mx-auto rounded-lg" />
              <div className="skeleton h-6 w-[600px] mx-auto rounded-lg" />
            </div>
          </div>
        </section>

        {/* Services Grid Skeleton */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header Skeleton */}
            <div className="text-center mb-16">
              <div className="skeleton h-12 w-80 mx-auto mb-6 rounded-lg" />
              <div className="skeleton h-5 w-[700px] mx-auto mb-2 rounded-lg" />
              <div className="skeleton h-5 w-[500px] mx-auto rounded-lg" />
            </div>

            {/* Services Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-card border-2 border-transparent"
                >
                  {/* Icon and Content */}
                  <div className="mb-6">
                    <div className="skeleton w-16 h-16 rounded-2xl mb-4" />
                    <div className="skeleton h-8 w-48 mb-3 rounded-lg" />
                    <div className="skeleton h-4 w-full mb-2 rounded-lg" />
                    <div className="skeleton h-4 w-3/4 mb-4 rounded-lg" />
                  </div>

                  {/* Features List Skeleton */}
                  <div className="space-y-3 mb-8">
                    {[...Array(6)].map((_, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="skeleton w-4 h-4 rounded-full mr-3 flex-shrink-0" />
                        <div className="skeleton h-4 flex-1 rounded-lg" />
                      </div>
                    ))}
                  </div>

                  {/* Button Skeleton */}
                  <div className="skeleton h-12 w-full rounded-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section Skeleton */}
        <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header Skeleton */}
            <div className="text-center mb-16">
              <div className="skeleton h-12 w-64 mx-auto mb-6 rounded-lg" />
              <div className="skeleton h-5 w-[650px] mx-auto mb-2 rounded-lg" />
              <div className="skeleton h-5 w-[450px] mx-auto rounded-lg" />
            </div>

            {/* Process Steps Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                  className="bg-card rounded-2xl p-6 shadow-card text-center"
                >
                  <div className="skeleton w-16 h-16 rounded-full mx-auto mb-6" />
                  <div className="skeleton h-6 w-32 mx-auto mb-3 rounded-lg" />
                  <div className="skeleton h-4 w-full mb-2 rounded-lg" />
                  <div className="skeleton h-4 w-3/4 mx-auto mb-4 rounded-lg" />
                  <div className="skeleton h-4 w-20 mx-auto rounded-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section Skeleton */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div className="skeleton h-12 w-80 mx-auto rounded-lg" />
              <div className="skeleton h-5 w-[600px] mx-auto mb-2 rounded-lg" />
              <div className="skeleton h-5 w-[500px] mx-auto rounded-lg" />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="skeleton h-12 w-48 rounded-lg" />
                <div className="skeleton h-12 w-40 rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Loading Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-card rounded-full p-4 shadow-elegant">
            <motion.div
              className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesLoading;