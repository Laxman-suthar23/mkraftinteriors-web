"use client";

import Link from "next/link";
import { Plus, FolderOpen, MessageSquare, Star, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  {
    title: "Add New Project",
    description: "Create a new interior design project",
    href: "/admin/projects/new",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "View Projects",
    description: "Manage existing projects",
    href: "/admin/projects",
    icon: FolderOpen,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Contact Submissions",
    description: "Review client inquiries",
    href: "/admin/contacts",
    icon: MessageSquare,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Add Review",
    description: "Add a client testimonial",
    href: "/admin/reviews/new",
    icon: Star,
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    title: "Settings",
    description: "Configure site settings",
    href: "/admin/settings",
    icon: Settings,
    color: "bg-gray-500 hover:bg-gray-600",
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className="w-full h-auto flex-col space-y-2 p-6 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
