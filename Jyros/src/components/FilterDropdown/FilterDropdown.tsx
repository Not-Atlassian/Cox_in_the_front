import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "./FilterDropdown.css";
import { ChevronDown, ChevronUp } from "@mynaui/icons-react"; // import ChevronUp
import { useState } from "react";
import { Button } from "../ui/button";

const FilterDropdown = () => {
  // State for individual filter checkboxes
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: boolean }>({
    Epic: false,
    Done: false,
    "In Plating": false,
    Cooking: false,
    "To Do": false,
  });

  // State to track if the dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // List of filters
  const filterList = ["Epic", "Done", "In Plating", "Cooking", "To Do"];

  // Handle individual filter change
  const handleFilterChange = (filter: string, isChecked: boolean) => {
    setSelectedFilters((prevSelected) => ({
      ...prevSelected,
      [filter]: isChecked,
    }));
  };

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}> {/* Track dropdown open state */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" style={{paddingRight: "5px"}}>
          Filter by {isOpen ? <ChevronUp style={{marginLeft: "60px"}}/> : <ChevronDown  style={{marginLeft: "60px"}}/>} {/* Conditionally render chevron */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* Render filter checkboxes */}
        {filterList.map((filter) => (
          <DropdownMenuCheckboxItem
            key={filter}
            checked={selectedFilters[filter] || false}
            onCheckedChange={(isChecked) => handleFilterChange(filter, isChecked)}
          >
            {filter}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
