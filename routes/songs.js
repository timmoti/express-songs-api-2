const express = require('express');
const router = express.Router();
const _ = require('lodash');

let songs = [];
let songID = 0;

//Song API
//return list of all songs
router.get('/', (req, res) => {
    res.status(200).json(songs);
  });
  
//create a new song, and return new song
router.post('/', (req, res) => {
    let song = req.body;
    songID++;
    song.id = songID + '';
    songs.push(song);
    res.status(201).json(song);
});

//return a song with id 
router.get('/:id', (req, res) => {
    let song = _.find(songs, {id: req.params.id});
    res.status(200).json(song || {});
});

//edit a song with id, and return edited song
router.put('/:id', (req, res) => {
    let update = req.body;
    if (update.id) {
        delete update.id
    }
    let song = _.findIndex(songs, {id: req.params.id});
    let updatedSong = _.assign(songs[song], update);
    res.status(200).json(updatedSong);
});

//delete a song with id, and return deleted song
router.delete("/:id", (req, res) => {
    let songToDelete = songs[_.findIndex(songs, {id: req.params.id})];
    songs = songs.filter(song => song.id !== req.params.id);
    res.status(200).json(songToDelete);
});

module.exports = router;