const Movie = require('../models/movieModel');
const Genre = require('../models/genreModel');
const Cast = require('../models/castModel');
const tmdb = require('../utils/tmdb');


// @desc    Populate database with TMDB movies
// @route   GET /api/movies/populate
// @access  Private
exports.fetchAndStoreMovies = async (req, res) => {
  try {
    const response = await tmdb.get("/discover/movie?sort_by=popularity.desc&page=1");
    const movies = response.data.results || 

   (let movie of movies) {
      const [details, credits] = await Promise.all([
        tmdb.get(`/movie/${movie.id}`),
        tmdb.get(`/movie/${movie.id}/credits`)
      ]);

      const genreIds = [];
      for (let g of details.data.genres) {
        const genre = await Genre.findOneAndUpdate(
          { tmdb_id: g.id },
          { name: g.name },
          { upsert: true, new: true }
        );
        genreIds.push(genre._id);
      }

      const castIds = [];
      for (let c of credits.data.cast.slice(0, 5)) {
        const cast = await Cast.create({
          tmdb_id: c.id,
          name: c.name,
          character: c.character,
          profile_path: c.profile_path
        });
        castIds.push(cast._id);
      }

      await Movie.create({
        tmdb_id: details.data.id,
        title: details.data.title,
        overview: details.data.overview,
        release_date: details.data.release_date,
        popularity: details.data.popularity,
        vote_average: details.data.vote_average,
        vote_count: details.data.vote_count,
        revenue: details.data.revenue,
        poster_path: details.data.poster_path,
        backdrop_path: details.data.backdrop_path,
        genres: genreIds,
        cast: castIds
      });
    }

    res.status(200).json({ message: "Movies saved successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch/store movies." });
  }
};

// @desc    Get movies with filters, pagination, sorting
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    year,
    genres,
    without_genres,
    sort_by = 'popularity',
    order = 'desc',
    search
  } = req.query;

  try {
    const query = {};

    if (year) {
      query.release_date = { $regex: `^${year}` };
    }

    if (genres) {
      query.genres = { $in: genres.split(',') };
    }

    if (without_genres) {
      query.genres = { $nin: without_genres.split(',') };
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { overview: new RegExp(search, 'i') }
      ];
    }

    const movies = await Movie.find(query)
      .populate('genres')
      .populate('cast')
      .sort({ [sort_by]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const count = await Movie.countDocuments(query);

    res.json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      results: movies
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
