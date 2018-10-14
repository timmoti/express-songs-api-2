const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

app.use(express.static('client'));
app.use(express.json())

let songs = [];
let id = 0;

//return list of all songs
app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

//create a new song, and return new song
app.post('/songs', (req, res) => {
  let song = req.body;
  id++;
  song.id = id + '';
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

module.exports = app