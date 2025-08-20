"use client";

import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ProjectFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  projectCount: number;
}

const projectTypes = [
  { value: "all", label: "All Projects" },
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Hospitality", label: "Hospitality" },
];

export default function ProjectFilters({
  selectedType,
  onTypeChange,
  projectCount,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-4 w-full sm:w-auto">
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
        
        {selectedType !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTypeChange("all")}
          >
            Clear Filters
          </Button>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        {projectCount} project{projectCount !== 1 ? "s" : ""} found
      </div>
    </div>
  );
}
