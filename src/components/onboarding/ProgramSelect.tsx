
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgramSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

const programs = [
  "Business Administration", "Computer Science", "Engineering", "Medicine", "Law",
  "Economics", "Psychology", "International Relations", "Architecture", "Design",
  "Marketing", "Finance", "Accounting", "Data Science", "Artificial Intelligence",
  "Environmental Science", "Political Science", "Sociology", "History", "Philosophy",
  "Literature", "Art History", "Music", "Theater", "Film Studies", "Journalism",
  "Communications", "Education", "Social Work", "Public Health", "Nursing",
  "Biology", "Chemistry", "Physics", "Mathematics", "Statistics", "Other"
];

const ProgramSelect: React.FC<ProgramSelectProps> = ({
  value,
  onChange,
  placeholder,
  label
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 px-4 text-left font-normal"
          >
            {value ? value : placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search program..." />
            <CommandList>
              <CommandEmpty>No program found.</CommandEmpty>
              <CommandGroup>
                {programs.map((program) => (
                  <CommandItem
                    key={program}
                    value={program}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === program ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {program}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProgramSelect;
