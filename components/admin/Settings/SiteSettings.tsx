"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Globe, Image, Phone, Mail, MapPin } from "lucide-react";

interface SiteSettingsData {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
  favicon: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    analyticsId: string;
  };
}

export default function SiteSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SiteSettingsData>({
    defaultValues: {
      siteName: 'Karni Interiors',
      siteDescription: 'Premium Interior Design Services',
      siteUrl: 'https://karniinteriors.com',
      logo: '/logo.png',
      favicon: '/favicon.ico',
      maintenanceMode: false,
      maintenanceMessage: 'We are currently performing maintenance. Please check back later.',
      contactEmail: 'info@karniinteriors.com',
      contactPhone: '(555) 123-4567',
      address: '123 Design District, Suite 456, Los Angeles, CA 90028',
      socialMedia: {
        facebook: 'https://facebook.com/karniinteriors',
        instagram: 'https://instagram.com/karniinteriors',
        linkedin: 'https://linkedin.com/company/karniinteriors',
        twitter: 'https://twitter.com/karniinteriors',
      },
      seoSettings: {
        metaTitle: 'Karni Interiors - Premium Interior Design Services',
        metaDescription: 'Transform your space with our expert interior design services. From residential to commercial projects, we create beautiful and functional interiors.',
        metaKeywords: 'interior design, home decor, commercial design, residential design',
        analyticsId: '',
      },
    }
  });

  const maintenanceMode = watch("maintenanceMode");

  const onSubmit = async (data: SiteSettingsData) => {
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admin/settings/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update site settings');
      }

      setStatus({
        type: 'success',
        message: 'Site settings updated successfully'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to update site settings'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {status && (
        <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  {...register("siteName", { required: "Site name is required" })}
                  placeholder="Karni Interiors"
                />
                {errors.siteName && (
                  <p className="text-sm text-red-500">{errors.siteName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  {...register("siteUrl", { 
                    required: "Site URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Please enter a valid URL"
                    }
                  })}
                  placeholder="https://karniinteriors.com"
                />
                {errors.siteUrl && (
                  <p className="text-sm text-red-500">{errors.siteUrl.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                {...register("siteDescription", { required: "Site description is required" })}
                rows={3}
                placeholder="Premium Interior Design Services"
              />
              {errors.siteDescription && (
                <p className="text-sm text-red-500">{errors.siteDescription.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  {...register("logo")}
                  placeholder="/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input
                  id="favicon"
                  {...register("favicon")}
                  placeholder="/favicon.ico"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail", { 
                    required: "Contact email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="info@karniinteriors.com"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  {...register("contactPhone", { required: "Contact phone is required" })}
                  placeholder="(555) 123-4567"
                />
                {errors.contactPhone && (
                  <p className="text-sm text-red-500">{errors.contactPhone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                {...register("address", { required: "Address is required" })}
                rows={3}
                placeholder="123 Design District, Suite 456, Los Angeles, CA 90028"
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  {...register("socialMedia.facebook")}
                  placeholder="https://facebook.com/karniinteriors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  {...register("socialMedia.instagram")}
                  placeholder="https://instagram.com/karniinteriors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  {...register("socialMedia.linkedin")}
                  placeholder="https://linkedin.com/company/karniinteriors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  {...register("socialMedia.twitter")}
                  placeholder="https://twitter.com/karniinteriors"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                {...register("seoSettings.metaTitle")}
                placeholder="Karni Interiors - Premium Interior Design Services"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                {...register("seoSettings.metaDescription")}
                rows={3}
                placeholder="Transform your space with our expert interior design services..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input
                id="metaKeywords"
                {...register("seoSettings.metaKeywords")}
                placeholder="interior design, home decor, commercial design"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="analyticsId">Google Analytics ID</Label>
              <Input
                id="analyticsId"
                {...register("seoSettings.analyticsId")}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Mode */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Show maintenance page to visitors while keeping admin access
                </p>
              </div>
              <Switch {...register("maintenanceMode")} />
            </div>

            {maintenanceMode && (
              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                <Textarea
                  id="maintenanceMessage"
                  {...register("maintenanceMessage")}
                  rows={3}
                  placeholder="We are currently performing maintenance..."
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Site Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
