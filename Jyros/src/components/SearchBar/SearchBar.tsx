// SearchBar.tsx
import { Input } from "@/components/ui/input"
import { Search } from "@mynaui/icons-react"
import "./SearchBar.css"

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <Search className="search-icon" />
      <Input 
        type="text" 
        placeholder="Search task"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Handle input change
      />
    </div>
  )
}


export default SearchBar;
