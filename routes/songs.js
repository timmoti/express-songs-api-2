const express = require('express');
const router = express.Router();
const _ = require('lodash');

let songs = [];
let songID = 0;

//Song API
//return list of all songs
router.get('/', (req, res, next) => {
    res.status(200).json(songs);
});
  
//create a new song, and return new song
router.post('/', (req, res, next) => {
    let song = req.body;
    if (song) {
        songID++;
        song.id = songID + '';
        songs.push(song);
        res.status(201).json(song);
    }
    next(new Error("Unable to create song"))
});

//return a song with id 
router.get('/:id', (req, res, next) => {
    let song = _.find(songs, {id: req.params.id});
    if(song) {
        res.status(200).json(song);
    }
    next(new Error(`Unable to find song with id: ${req.params.id}`))
});

//update a song with id, and return edited song
router.put('/:id', (req, res, next) => {
    let update = req.body;
    if (update.id) {
        delete update.id
    }
    let song = _.findIndex(songs, {id: req.params.id});
    if(song >= 0){
        let updatedSong = _.assign(songs[song], update);
        res.status(200).json(updatedSong);
    }
    next(new Error(`Unable to update song with id: ${req.params.id}`))
});

//delete a song with id, and return deleted song
router.delete("/:id", (req, res, next) => {
    let songToDelete = songs[_.findIndex(songs, {id: req.params.id})];
    if(songToDelete){
        songs = songs.filter(song => song.id !== req.params.id);
        res.status(200).json(songToDelete);
    }
    next(new Error(`Unable to delete song with id: ${req.params.id}`))
});

//Add error handler for songs router to return 404 on failure at any route
router.use((err, req, res, next) => {
    res.status(404).json({ message: err.message });
});

module.exports = router;