import { useMovieContext } from "../context/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-zinc-900 transition-transform duration-200 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative aspect-[2/3] w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
          <button
  className={`absolute top-4 right-4 text-xl w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 ${
    favorite
      ? "bg-black/70 text-red-500"
      : "bg-black/50 text-white hover:bg-black/80"
  }`}
  onClick={onFavoriteClick}
>
  ♥
</button>

        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-white text-base font-semibold">{movie.title}</h3>
        <p className="text-sm text-zinc-400">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
