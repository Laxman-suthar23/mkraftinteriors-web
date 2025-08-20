"use client";

import { Mail, Phone, Calendar, User, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactSubmission } from "@/types";
import { formatDate } from "@/lib/utils";

interface ContactDetailsProps {
  contact: ContactSubmission;
  onStatusChange?: (status: string) => void;
}

export default function ContactDetails({ contact, onStatusChange }: ContactDetailsProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "contacted": return "secondary";
      case "closed": return "outline";
      default: return "outline";
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contact.email}?subject=Re: Your inquiry about ${contact.projectType}&body=Dear ${contact.name},%0D%0A%0D%0AThank you for your interest in our interior design services.%0D%0A%0D%0ABest regards,%0D%0AKarni Interiors Team`;
  };

  const handlePhoneClick = () => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
            <Badge variant={getStatusBadgeVariant(contact.status)}>
              {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <p className="text-lg font-semibold">{contact.name}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="flex items-center space-x-2">
                <p className="text-sm">{contact.email}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEmailClick}
                  className="h-6 w-6 p-0"
                >
                  <Mail className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {contact.phone && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <div className="flex items-center space-x-2">
                  <p className="text-sm">{contact.phone}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePhoneClick}
                    className="h-6 w-6 p-0"
                  >
                    <Phone className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Project Type</label>
            <Badge variant="outline" className="ml-2">
              {contact.projectType}
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Submitted</label>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{formatDate(contact.createdAt)}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{formatDate(contact.updatedAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Message</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleEmailClick} className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Send Email</span>
            </Button>
            
            {contact.phone && (
              <Button variant="outline" onClick={handlePhoneClick} className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </Button>
            )}
            
            {onStatusChange && contact.status === "new" && (
              <Button 
                variant="secondary" 
                onClick={() => onStatusChange("contacted")}
                className="flex items-center space-x-2"
              >
                <span>Mark as Contacted</span>
              </Button>
            )}
            
            {onStatusChange && contact.status !== "closed" && (
              <Button 
                variant="outline" 
                onClick={() => onStatusChange("closed")}
                className="flex items-center space-x-2"
              >
                <span>Mark as Closed</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
