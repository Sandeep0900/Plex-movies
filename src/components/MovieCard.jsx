import React from "react";

const MovieCard = ({ movie, onWatchTrailer }) => {
  return (
    <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl hover:shadow-red-600/20 transition-all duration-300 overflow-hidden border border-gray-700 hover:border-red-600">
      <div className="relative overflow-hidden">
        <img
          src={movie.thumb}
          alt={movie.title}
          className="rounded-t-2xl w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ⭐ {movie.rating || "N/A"}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-white line-clamp-1 group-hover:text-red-500 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            📅 {movie.year}
          </span>
          {movie.duration && (
            <span className="flex items-center gap-1">
              ⏱️ {Math.floor(movie.duration / 60000)}m
            </span>
          )}
        </div>
        
        <button
          onClick={() => onWatchTrailer(movie.title)}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span className="text-xl">▶</span>
          Watch Trailer
        </button>
      </div>
    </div>
  );
};

export default MovieCard;