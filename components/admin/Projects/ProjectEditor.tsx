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
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "./ImageUploader";
import { ProjectSchema, type ProjectFormData } from "@/types/project";
import { Project } from "@/types";
import { projectService } from "@/lib/services/projectService";

interface ProjectEditorProps {
  project?: Project;
  onSuccess: () => void;
}
export default function ProjectEditor({ project, onSuccess }: ProjectEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
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

  const onSubmit = async (data: ProjectFormData) => {
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const projectData = {
        ...data,
        images,
        mainImage: images[0], // First image as main
      };

      if (project) {
        await projectService.update(project.id, projectData);
      } else {
        await projectService.create(projectData);
      }

      setSubmitStatus("success");
      setTimeout(onSuccess, 1500);
    } catch (error) {
      console.error("Error saving project:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {submitStatus === "success" && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            Project {project ? "updated" : "created"} successfully!
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert variant="destructive">
          <AlertDescription>
            There was an error saving the project. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
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
      </div>

      {/* Project Details */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Project Details</h3>
        
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
            onCheckedChange={(checked: boolean) => setValue("featured", checked)}
            disabled={isSubmitting}
          />
          <Label htmlFor="featured">Featured Project</Label>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Project Images</h3>
        <ImageUploader
          images={images}
          onImagesChange={setImages}
          maxImages={50}
        />
        {images.length === 0 && (
          <p className="text-sm text-red-500">At least one image is required</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
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
