const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true, unique: true },
  title: String,
  overview: String,
  release_date: Date,
  popularity: Number,
  vote_average: Number,
  vote_count: Number,
  revenue: Number,
  poster_path: String,
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cast' }]
});

module.exports = mongoose.model('Movie', movieSchema);
