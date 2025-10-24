import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4 px-4"
    >
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-3 pl-12 rounded-2xl text-white bg-gray-800 border-2 border-gray-700 focus:border-red-600 outline-none transition-all duration-300 shadow-lg"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">
          🔍
        </span>
      </div>
      <button
        type="submit"
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-2xl font-semibold shadow-lg hover:shadow-blue-600/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;