
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

const popularCities = [
  "Amsterdam", "Athens", "Barcelona", "Berlin", "Bologna", "Brussels", "Budapest", 
  "Copenhagen", "Dublin", "Edinburgh", "Florence", "Frankfurt", "Geneva", "Hamburg",
  "Helsinki", "Krakow", "Lisbon", "London", "Lyon", "Madrid", "Milan", "Munich",
  "Oslo", "Paris", "Prague", "Rome", "Stockholm", "Vienna", "Warsaw", "Zurich",
  "Boston", "Chicago", "Los Angeles", "New York", "San Francisco", "Washington DC",
  "Toronto", "Vancouver", "Montreal", "Sydney", "Melbourne", "Brisbane", "Tokyo",
  "Seoul", "Singapore", "Hong Kong", "Shanghai", "Beijing"
];

const CitySelect: React.FC<CitySelectProps> = ({
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
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {popularCities.map((city) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city}
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

export default CitySelect;
