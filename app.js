const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let songs = [];
let movies = [];
let songID = 0;
let movieID = 0;

//Song API
//return list of all songs
app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

//create a new song, and return new song
app.post('/songs', (req, res) => {
  let song = req.body;
  songID++;
  song.id = songID + '';
  songs.push(song);
  res.status(201).json(song);
});

//return a song with id 
app.get('/songs/:id', (req, res) => {
  let song = _.find(songs, {id: req.params.id});
  res.status(200).json(song || {});
});

//edit a song with id, and return edited song
app.put('/songs/:id', (req, res) => {
  let update = req.body;
  if (update.id) {
    delete update.id
  }
  let song = _.findIndex(songs, {id: req.params.id});
  let updatedSong = _.assign(songs[song], update);
  res.status(200).json(updatedSong);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  let songToDelete = songs[_.findIndex(songs, {id: req.params.id})];
  songs = songs.filter(song => song.id !== req.params.id);
  res.status(200).json(songToDelete);
});


// Movies API
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

app.post('/movies', (req, res) => {
  let movie = req.body;
  movieID++;
  movie.id = movieID + '';
  movies.push(movie);
  res.status(201).json(movie);
});

app.get('/movies/:id', (req, res) => {
  let movie = _.find(movies, {id: req.params.id});
  res.status(200).json(movie || {});
});

app.put('/movies/:id', (req, res) => {
  let update = req.body;
  if (update.id) {
    delete update.id
  }
  let movie = _.findIndex(movies, {id: req.params.id});
  let updatedMovie = _.assign(movies[movie], update);
  res.status(200).json(updatedMovie);
});

app.delete("/movies/:id", (req, res) => {
  let movieToDelete = movies[_.findIndex(movies, {id: req.params.id})];
  movies = movies.filter(movie => movie.id !== req.params.id);
  res.status(200).json(movieToDelete);
});

module.exports = app