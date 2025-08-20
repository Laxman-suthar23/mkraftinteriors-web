"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";
import { ContactSubmission } from "@/types";
import { useForm } from "react-hook-form";

interface ContactEditFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  status: string;
}

export default function EditContactPage() {
  const params = useParams();
  const router = useRouter();
  const [contact, setContact] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContactEditFormData>();

  const watchedStatus = watch("status");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`/api/contact/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setContact(data);
          
          // Populate form with contact data
          setValue("name", data.name);
          setValue("email", data.email);
          setValue("phone", data.phone || "");
          setValue("projectType", data.projectType);
          setValue("message", data.message);
          setValue("status", data.status);
        } else {
          setError("Contact not found");
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        setError("Failed to load contact");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchContact();
    }
  }, [params.id, setValue]);

  const onSubmit = async (data: ContactEditFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/contact/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/contacts");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      setError("Failed to update contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/contacts");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !contact) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Contact Not Found</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
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
      <div className="flex items-center space-x-4">
        <Link href="/admin/contacts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contacts
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Contact</h1>
          <p className="text-muted-foreground">Update contact information</p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="email@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select
                  value={watch("projectType")}
                  onValueChange={(value) => setValue("projectType", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
                {errors.projectType && (
                  <p className="text-sm text-red-500">{errors.projectType.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={watchedStatus}
                onValueChange={(value) => setValue("status", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                rows={6}
                placeholder="Contact message..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Contact"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
