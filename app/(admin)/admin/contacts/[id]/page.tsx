"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";
import { ContactSubmission } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminContactViewPage() {
  const params = useParams();
  const [contact, setContact] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`/api/contact/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setContact(data);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchContact();
    }
  }, [params.id]);

  const handleSendEmail = () => {
    if (contact) {
      window.location.href = `mailto:${contact.email}?subject=Re: Your inquiry about ${contact.projectType}&body=Dear ${contact.name},%0D%0A%0D%0AThank you for your interest in our interior design services.%0D%0A%0D%0ABest regards,%0D%0AKarni Interiors Team`;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "contacted": return "secondary";
      case "closed": return "outline";
      default: return "outline";
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!contact) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Contact Not Found</h1>
        <Link href="/admin/contacts">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contacts
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/contacts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contacts
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{contact.name}</h1>
            <p className="text-muted-foreground">
              Submitted on {formatDate(contact.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant={getStatusBadgeVariant(contact.status)}>
            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
          </Badge>
          <Button onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </div>
      </div>

      {/* Contact Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="leading-relaxed whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Details Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="font-medium">Name</label>
                  <p className="text-muted-foreground">{contact.name}</p>
                </div>
                
                <div>
                  <label className="font-medium">Email</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-muted-foreground">{contact.email}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSendEmail}
                      className="h-6 w-6 p-0"
                    >
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {contact.phone && (
                  <div>
                    <label className="font-medium">Phone</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-muted-foreground">{contact.phone}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.location.href = `tel:${contact.phone}`}
                        className="h-6 w-6 p-0"
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="font-medium">Project Type</label>
                  <p className="text-muted-foreground">{contact.projectType}</p>
                </div>
                
                <div>
                  <label className="font-medium">Status</label>
                  <div className="mt-1">
                    <Badge variant={getStatusBadgeVariant(contact.status)}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <label className="font-medium">Submitted</label>
                  <p className="text-muted-foreground">
                    {formatDate(contact.createdAt)}
                  </p>
                </div>
                
                <div>
                  <label className="font-medium">Last Updated</label>
                  <p className="text-muted-foreground">
                    {formatDate(contact.updatedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
