import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/Api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-8">
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto mb-6 px-4 flex gap-4"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="text-center text-red-500 font-medium mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-center text-white font-semibold">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
