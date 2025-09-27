"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TransformSpaceCTA() {
  return (
    <section className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-accent-foreground mb-8"
          >
            Ready to Transform Your Space?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-accent-foreground/80 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Let's bring your vision to life. Contact us today for a free consultation and discover
            how we can create the perfect space for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-background text-foreground hover:bg-accent-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:text-accent transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get Free Consultation
              </Button>
            </Link>

            <Link href="tel:+1234567890">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-accent-foreground/20 text-foreground hover:bg-accent-foreground hover:text-accent px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Today
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}