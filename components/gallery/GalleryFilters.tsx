"use client";

import { Search, Filter, Grid, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GalleryFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  viewMode: "grid" | "masonry";
  onViewModeChange: (mode: "grid" | "masonry") => void;
  imageCount: number;
}

const projectTypes = [
  { value: "all", label: "All Types" },
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Hospitality", label: "Hospitality" },
];

export default function GalleryFilters({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  viewMode,
  onViewModeChange,
  imageCount,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-4 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {imageCount} image{imageCount !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "masonry" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("masonry")}
            className="h-8 w-8 p-0"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
