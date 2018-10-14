const express = require('express');
const app = express();

app.use(express.static('client'));
app.use(express.json())

let songs = [];
let movies = [];

//Songs API
//return list of all songs
app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

//create a new song, and return new song
app.post('/songs', (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist 
  }
  songs.push(newSong);
  res.status(201).json(newSong);
});

//return a song with id 
app.get('/songs/:id', (req, res) => {
  let song = songs.find(song => song.id == parseInt(req.params.id));
  res.status(200).json(song);
});

//edit a song with id, and return edited song
app.put('/songs/:id', (req, res) => {
  let song = songs.find(song => song.id === parseInt(req.params.id));
  song.name = req.body.name;
  song.artist = req.body.artist;
  res.status(200).json(song);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  let songToDelete = songs.find(song => song.id === parseInt(req.params.id));
  let index = songs.indexOf(songToDelete);
  songs.splice(index, 1);
  res.status(200).json(songToDelete);
});


// Movies API
//return list of all movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//create a new movie, and return new movie
app.post('/movies', (req, res) => {
  let newmovie = {
    id: movies.length + 1,
    name: req.body.name,
    artist: req.body.artist 
  }
  movies.push(newmovie);
  res.status(201).json(newmovie);
});

//return a movie with id 
app.get('/movies/:id', (req, res) => {
  let movie = movies.find(movie => movie.id == parseInt(req.params.id));
  res.status(200).json(movie);
});

//edit a movie with id, and return edited movie
app.put('/movies/:id', (req, res) => {
  let movie = movies.find(movie => movie.id === parseInt(req.params.id));
  movie.name = req.body.name;
  movie.artist = req.body.artist;
  res.status(200).json(movie);
});

//delete a movie with id, and return deleted movie
app.delete("/movies/:id", (req, res) => {
  let movieToDelete = movies.find(movie => movie.id === parseInt(req.params.id));
  let index = movies.indexOf(movieToDelete);
  movies.splice(index, 1);
  res.status(200).json(movieToDelete);
});

module.exports = app