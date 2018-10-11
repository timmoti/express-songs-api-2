const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const PORT = 3000

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let songs = [];
let id = 0;

//return list of all songs
app.get('/songs', (req, res) => {
  res.json(songs);
});

//create a new song, and return new song
app.post('/songs', (req, res) => {
  let song = req.body;
  id++;
  song.id = id + '';
  songs.push(song);
  res.json(song);
});

//return a song with id 
app.get('/songs/:id', (req, res) => {
  let song = _.find(songs, {id: req.params.id});
  res.json(song || {});
});

//edit a song with id, and return edited song
app.put('/songs/:id', (req, res) => {
  let update = req.body;
  if (update.id) {
    delete update.id
  }
  let song = _.findIndex(songs, {id: req.params.id});
  let updatedSong = _.assign(songs[song], update);
  res.json(updatedSong);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  let songToDelete = songs[_.findIndex(songs, {id: req.params.id})];
  songs = songs.filter(song => song.id !== req.params.id);
  res.json(songToDelete);
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
