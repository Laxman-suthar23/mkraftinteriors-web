"use client";

import { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import FadeIn from "@/components/animations/FadeIn";
import { TeamMember as TeamMemberType } from "@/types";

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/team?active=true");
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
            <div className="h-6 bg-muted rounded w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 bg-muted rounded-full mx-auto mb-6" />
                <div className="h-6 bg-muted rounded w-32 mx-auto mb-2" />
                <div className="h-4 bg-muted rounded w-40 mx-auto mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">Meet Our Team</h2>
            <p className="body-large max-w-2xl mx-auto">
              Our talented team of designers, architects, and project managers 
              brings decades of combined experience to every project.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
