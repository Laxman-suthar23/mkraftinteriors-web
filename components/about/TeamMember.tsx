"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TeamMember as TeamMemberType } from "@/types";

interface TeamMemberProps {
  member: TeamMemberType;
  index: number;
}

export default function TeamMember({ member, index }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center group"
    >
      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {member.name}
      </h3>
      
      <p className="text-primary font-medium mb-4">
        {member.role}
      </p>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {member.bio}
      </p>
    </motion.div>
  );
}
