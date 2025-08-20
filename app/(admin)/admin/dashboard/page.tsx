"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Star,
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  Eye,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DashboardStats {
  totalProjects: number;
  totalReviews: number;
  totalContacts: number;
  totalTeamMembers: number;
  recentProjects: any[];
  recentContacts: any[];
}

const statCards = [
  {
    title: "Total Projects",
    key: "totalProjects" as keyof DashboardStats,
    icon: FolderOpen,
    color: "text-blue-600",
    href: "/admin/projects",
  },
  {
    title: "Reviews",
    key: "totalReviews" as keyof DashboardStats,
    icon: Star,
    color: "text-yellow-600",
    href: "/admin/reviews",
  },
  {
    title: "Contact Submissions",
    key: "totalContacts" as keyof DashboardStats,
    icon: MessageSquare,
    color: "text-green-600",
    href: "/admin/contacts",
  },
  {
    title: "Team Members",
    key: "totalTeamMembers" as keyof DashboardStats,
    icon: Users,
    color: "text-purple-600",
    href: "/admin/team",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalReviews: 0,
    totalContacts: 0,
    totalTeamMembers: 0,
    recentProjects: [],
    recentContacts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, reviewsRes, contactsRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/reviews"),
          fetch("/api/contact"),
        ]);

        const [projects, reviews, contacts] = await Promise.all([
          projectsRes.json(),
          reviewsRes.json(),
          contactsRes.json(),
        ]);

        setStats({
          totalProjects: projects.length,
          totalReviews: reviews.length,
          totalContacts: contacts.length,
          totalTeamMembers: 3, // Static for now
          recentProjects: projects.slice(0, 5),
          recentContacts: contacts.slice(0, 5),
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={card.href}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats[card.key] as number}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total {card.title.toLowerCase()}
                  </p>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/projects">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.recentProjects.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No projects yet
                </p>
              ) : (
                stats.recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {project.type}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Contacts</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/contacts">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.recentContacts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No contacts yet
                </p>
              ) : (
                stats.recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {contact.projectType}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild className="h-auto flex-col py-4">
                <Link href="/admin/projects/new">
                  <Plus className="h-6 w-6 mb-2" />
                  Add Project
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto flex-col py-4">
                <Link href="/admin/reviews/new">
                  <Star className="h-6 w-6 mb-2" />
                  Add Review
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto flex-col py-4">
                <Link href="/" target="_blank">
                  <Eye className="h-6 w-6 mb-2" />
                  View Site
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto flex-col py-4">
                <Link href="/admin/settings">
                  <Users className="h-6 w-6 mb-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
