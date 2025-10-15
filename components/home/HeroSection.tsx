// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, Play } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";

// const heroImages = [
//   {
//     src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop",
//     title: "Modern Luxury Villa",
//     subtitle: "Koramangla Banglaore",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop",
//     title: "Executive Office Suite",
//     subtitle: "Jp Nagar Bangalore",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop",
//     title: "Minimalist Urban Loft",
//     subtitle: "Jay Nagar",
//   },
// ];

// export default function HeroSection() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % heroImages.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [isAutoPlaying]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % heroImages.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex(
//       (prev) => (prev - 1 + heroImages.length) % heroImages.length
//     );
//   };

//   return (
//     <section className="relative h-screen overflow-hidden">
//       {/* Image Carousel */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.7, ease: "easeInOut" }}
//           className="absolute inset-0"
//         >
//           <Image
//             src={heroImages[currentIndex].src}
//             alt={heroImages[currentIndex].title}
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-black/40" />
//         </motion.div>
//       </AnimatePresence>

//       {/* Content Overlay */}
//       <div className="relative z-10 h-full flex items-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-3xl">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <h1 className="heading-1 text-white mb-6">
//                 Transform Your,
//                 <br />
//                 <span className="text-primary-400 ">Living Space</span>
//               </h1>
//               <p className="body-large text-white/90 mb-8 max-w-2xl">
//                 Creating extraordinary interiors that blend functionality with timeless elegance. Your dream space awaits.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link href="/contact">
//                   <Button size="lg" className="w-full sm:w-auto">
//                     Start Your Project
//                   </Button>
//                 </Link>
//                 <Link href="/portfolio">
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20"
//                   >
//                     View Portfolio
//                   </Button>
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all group"
//         onMouseEnter={() => setIsAutoPlaying(false)}
//         onMouseLeave={() => setIsAutoPlaying(true)}
//       >
//         <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all group"
//         onMouseEnter={() => setIsAutoPlaying(false)}
//         onMouseLeave={() => setIsAutoPlaying(true)}
//       >
//         <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
//       </button>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
//         {heroImages.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full transition-all ${
//               index === currentIndex
//                 ? "bg-white scale-110"
//                 : "bg-white/50 hover:bg-white/70"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Current Project Info */}
//       <div className="absolute bottom-6 right-6 z-20 text-right">
//         <div className="text-white/90 text-sm font-medium">
//           {heroImages[currentIndex].title}
//         </div>
//         <div className="text-white/70 text-xs">
//           {heroImages[currentIndex].subtitle}
//         </div>
//       </div>

//       {/* Auto-play Control */}
//       <button
//         onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//         className="absolute top-20 right-6 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
//       >
//         <Play
//           className={`w-4 h-4 text-white transition-transform ${
//             isAutoPlaying ? "scale-100" : "scale-75 opacity-50"
//           }`}
//         />
//       </button>
//     </section>
//   );
// }

"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 mt-4">
        <Image
          src="/hero-image.jpg" // put hero-image.jpg inside /public folder
          alt="Luxury interior design"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              Transform Your
            
              <span className="py-3 block text-gradient bg-gradient-accent bg-clip-text text-transparent">
                Living Space
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              Creating extraordinary interiors that blend functionality with
              timeless elegance. Your dream space awaits.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Start Your Project */}
              <Link href="/contact" passHref>
                <Button size="lg" className="btn-accent group">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              {/* View Portfolio */}
              <Link href="/portfolio" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-ghost text-primary hover:bg-primary-foreground hover:text-primary"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};
