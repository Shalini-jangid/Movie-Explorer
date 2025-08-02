const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true },
  name: String,
  character: String,
  profile_path: String,
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
});

module.exports = mongoose.model('Cast', castSchema);
