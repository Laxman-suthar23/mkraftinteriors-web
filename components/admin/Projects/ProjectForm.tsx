"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "./ImageUploader";
import { ProjectSchema, type ProjectFormData } from "@/types/project";
import { Project } from "@/types";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(project?.images || []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: project ? {
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription || "",
      location: project.location,
      date: new Date(project.date).toISOString().split('T')[0],
      client: project.client,
      type: project.type,
      featured: project.featured,
      images: project.images,
      mainImage: project.mainImage,
    } : {
      featured: false,
    },
  });

  const watchedType = watch("type");
  const watchedFeatured = watch("featured");

  const handleFormSubmit = async (data: ProjectFormData) => {
    if (images.length === 0) {
      setSubmitError("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const projectData = {
        ...data,
        images,
        mainImage: images[0],
      };

      await onSubmit(projectData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {submitError && (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Modern Family Home"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="Beverly Hills, CA"
                disabled={isSubmitting}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={3}
              placeholder="A brief description of the project..."
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              {...register("fullDescription")}
              rows={6}
              placeholder="Detailed description of the project..."
              disabled={isSubmitting}
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Project Type *</Label>
              <Select
                value={watchedType}
                onValueChange={(value) => setValue("type", value as any)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Hospitality">Hospitality</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Input
                id="client"
                {...register("client")}
                placeholder="Private Residence"
                disabled={isSubmitting}
              />
              {errors.client && (
                <p className="text-sm text-red-500">{errors.client.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Completion Date *</Label>
              <Input
                id="date"
                type="date"
                {...register("date")}
                disabled={isSubmitting}
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={watchedFeatured}
              onCheckedChange={(checked: boolean | undefined) => setValue("featured", checked)}
              disabled={isSubmitting}
            />
            <Label htmlFor="featured">Featured Project</Label>
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Project Images</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader
            images={images}
            onImagesChange={setImages}
            maxImages={10}
          />
          {images.length === 0 && (
            <p className="text-sm text-red-500 mt-2">At least one image is required</p>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? `${project ? "Updating" : "Creating"}...`
            : `${project ? "Update" : "Create"} Project`
          }
        </Button>
      </div>
    </form>
  );
}
