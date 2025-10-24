import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import TrailerModal from "./components/TrailerModal";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://discover.provider.plex.tv/library/search/?searchProviders=discover,plexAVOD,plexFAST&includeGroups=1&searchTypes=all,livetv,movies,tv,people&includeMetadata=1&filterPeople=1&limit=10&query=${query}`,
        {
          headers: { Accept: "application/json" },
        }
      );

      const results = res.data?.MediaContainer?.SearchResults || [];
      const external = results.find((r) => r.id === "external");
      const list = external?.SearchResult?.map((item) => item.Metadata) || [];
      setMovies(list);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load default search on component mount
  useEffect(() => {
    fetchMovies("happy new year");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 py-2">
        <div className="container mx-auto"></div>
      </div>
      
      <h1 className="text-5xl font-bold text-center py-12 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
        🎬 Plex Movie Search
      </h1>
      
      <SearchBar onSearch={fetchMovies} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-red-600 mb-4"></div>
          <p className="text-gray-400 text-xl">Searching for movies...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 py-10">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.ratingKey} movie={movie} onWatchTrailer={setSelectedTrailer} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="text-8xl mb-6">🍿</div>
              <p className="text-gray-400 text-xl text-center">
                No movies found. Try searching for something else!
              </p>
            </div>
          )}
        </div>
      )}

      {selectedTrailer && (
        <TrailerModal
          query={selectedTrailer}
          onClose={() => setSelectedTrailer(null)}
        />
      )}
    </div>
  );
};

export default App;