"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="heading-2 mb-6">
            Ready to Build and Transform Your Space?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let’s bring your vision to reality. Schedule a consultation today and see how we can build the perfect space for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                View Our Work
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center space-x-3"
            >
              <Phone className="h-5 w-5" />
              <div>
                <div className="font-medium">Call Us</div>
                <div className="text-sm opacity-90">+91 9845102493</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center space-x-3"
            >
              <Mail className="h-5 w-5" />
              <div>
                <div className="font-medium">Email Us</div>
                <div className="text-sm opacity-90">karniinteriors9@gmail.com</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
