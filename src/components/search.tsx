import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search query:", query);
    // search logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-[#FFFFFF36] rounded-[10px] overflow-hidden w-full max-w-md mx-auto"
    >
      <span className="flex items-center px-2">
        <Search className="text-white" size={18} />
      </span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for linkages name"
        className="bg-inherit text-base flex-grow px-2 py-2 border-none outline-none placeholder-[#98A2B3]"
      />
    </form>
  );
};

export default SearchComponent;
