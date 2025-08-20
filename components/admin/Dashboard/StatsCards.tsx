"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, MessageSquare, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/animations/AnimatedCounter";

interface StatsData {
  totalProjects: number;
  totalReviews: number;
  totalContacts: number;
  totalTeamMembers: number;
}

const statCards = [
  {
    title: "Total Projects",
    key: "totalProjects" as keyof StatsData,
    icon: FolderOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Client Reviews",
    key: "totalReviews" as keyof StatsData,
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    title: "Contact Submissions",
    key: "totalContacts" as keyof StatsData,
    icon: MessageSquare,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Team Members",
    key: "totalTeamMembers" as keyof StatsData,
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function StatsCards() {
  const [stats, setStats] = useState<StatsData>({
    totalProjects: 0,
    totalReviews: 0,
    totalContacts: 0,
    totalTeamMembers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setStats(data.overview);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-12 w-12 bg-muted rounded-lg mb-4" />
                <div className="h-8 bg-muted rounded w-16 mb-2" />
                <div className="h-4 bg-muted rounded w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <AnimatedCounter
                    end={stats[stat.key]}
                    duration={1.5}
                    className="text-2xl font-bold"
                  />
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
