import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const TrailerModal = ({ query, onClose }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {
  const fetchYouTubeTrailer = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`https://plex-movies-backend.onrender.com/api/trailer?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      console.log("YouTube API response:", data);

      const videoItem = data.items?.[0];
      const videoId = videoItem?.id?.videoId;

      console.log("Video ID:", videoId);

if (!videoId) {
  console.error("No videoId found in response", videoItem);
  setVideoUrl("");
  setError(true);
} else {
  const newUrl = `https://www.youtube.com/watch?v=${videoId}`;
  console.log("Video URL:", newUrl);
  console.log("ReactPlayer can play:", ReactPlayer.canPlay(newUrl)); // ✅ Add this line
  setVideoUrl(newUrl);
}
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setVideoUrl("");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (query) {
    fetchYouTubeTrailer();
  }
}, [query]);


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 relative w-full max-w-4xl shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          {query} - Trailer
        </h2>

        <div className="relative bg-black rounded-xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
              <p className="text-gray-300 text-lg">Loading trailer...</p>
            </div>
          ) : error || !videoUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-gray-300 text-lg">Trailer not available</p>
              <p className="text-gray-500 text-sm mt-2">Try searching for another movie</p>
            </div>
          ) : (
            <div className="absolute inset-0">
        <ReactPlayer 
          url={videoUrl}
          controls
          width="100%"
          height="100%"
          playing
          muted
          onReady={() => {
            console.log("ReactPlayer is ready and playing");
            setError(false); // We are ready, so no error
          }}
          onError={(e) => {
            console.error("ReactPlayer error:", e);
            setError(true);
          }}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
              },
            },
          }}
        />  

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;