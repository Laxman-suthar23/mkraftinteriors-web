"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  maxSelections?: number;
}

export default function FilterDropdown({
  title,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Select options",
  maxSelections,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectionChange = (value: string, checked: boolean) => {
    let newSelection: string[];

    if (checked) {
      if (maxSelections && selectedValues.length >= maxSelections) {
        return; // Don't allow more selections than max
      }
      newSelection = [...selectedValues, value];
    } else {
      newSelection = selectedValues.filter(v => v !== value);
    }

    onSelectionChange(newSelection);
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    if (selectedValues.length === 1) {
      const option = options.find(opt => opt.value === selectedValues[0]);
      return option?.label || selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  };

  const isOptionDisabled = (optionValue: string) => {
    return maxSelections && 
           !selectedValues.includes(optionValue) && 
           selectedValues.length >= maxSelections;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="justify-between min-w-[200px]"
        >
          <span className="truncate">{getDisplayText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="flex items-center justify-between">
          {title}
          {selectedValues.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-auto p-0 text-xs"
            >
              Clear all
            </Button>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedValues.includes(option.value)}
            onCheckedChange={(checked: boolean) => {
              if (isOptionDisabled(option.value) && checked) {
                return; // Prevent checking if disabled
              }
              handleSelectionChange(option.value, checked);
            }}
            className={isOptionDisabled(option.value) ? "opacity-50 cursor-not-allowed" : ""}
          >
            <div className="flex items-center justify-between w-full">
              <span>{option.label}</span>
              {option.count !== undefined && (
                <span className="text-xs text-muted-foreground ml-2">
                  ({option.count})
                </span>
              )}
            </div>
          </DropdownMenuCheckboxItem>
        ))}
        
        {options.length === 0 && (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            No options available
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
