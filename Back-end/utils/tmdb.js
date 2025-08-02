const axios = require('axios');

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: process.env.TMDB_ACCESS_TOKEN,
    'Content-Type': 'application/json'
  }
});

module.exports = tmdb;
