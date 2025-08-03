import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="w-full px-8 py-8 box-border">
        <h2 className="mb-8 text-center text-4xl text-rose-500 drop-shadow-lg font-bold">
          Your Favorites
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="animate-fade-in"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-16 bg-white/5 rounded-xl mx-auto mt-10 max-w-xl">
      <h2 className="mb-4 text-3xl font-bold text-red-600">No Favorite Movies Yet</h2>
      <p className="text-gray-400 text-lg leading-relaxed">
        Start adding movies to your favorites and they will appear here!
      </p>
    </div>
  );
}

export default Favorites;
