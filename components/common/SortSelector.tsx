"use client";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = {
  value: string;
  label: string;
  direction?: "asc" | "desc";
};

interface SortSelectorProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SortSelector({
  options,
  value,
  onChange,
  placeholder = "Sort by",
  className,
}: SortSelectorProps) {
  const selectedOption = options.find(option => option.value === value);

  const getIcon = (direction?: "asc" | "desc") => {
    switch (direction) {
      case "asc":
        return <ArrowUp className="h-4 w-4" />;
      case "desc":
        return <ArrowDown className="h-4 w-4" />;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-48 ${className}`}>
        <div className="flex items-center space-x-2">
          {getIcon(selectedOption?.direction)}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center space-x-2">
              {getIcon(option.direction)}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
