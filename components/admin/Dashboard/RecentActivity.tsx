"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, FolderOpen, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface RecentProject {
  id: string;
  title: string;
  location: string;
  type: string;
  createdAt: string;
}

interface RecentContact {
  id: string;
  name: string;
  email: string;
  projectType: string;
  status: string;
  createdAt: string;
}

interface ActivityData {
  projects: RecentProject[];
  contacts: RecentContact[];
}

export default function RecentActivity() {
  const [activity, setActivity] = useState<ActivityData>({
    projects: [],
    contacts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setActivity(data.recent);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="h-6 bg-muted rounded w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="h-6 bg-muted rounded w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Recent Projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activity.projects.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No recent projects
            </p>
          ) : (
            <div className="space-y-4">
              {activity.projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {project.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {project.location}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {project.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Recent Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activity.contacts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No recent contacts
            </p>
          ) : (
            <div className="space-y-4">
              {activity.contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <Link
                      href={`/admin/contacts`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {contact.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {contact.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {contact.projectType}
                      </Badge>
                      <Badge
                        variant={
                          contact.status === "new"
                            ? "default"
                            : contact.status === "contacted"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {contact.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
