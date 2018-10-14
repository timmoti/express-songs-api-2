const express = require('express');
const router = express.Router();

let songs = [];

//Song API
//return list of all songs
router.get('/', (req, res) => {
    res.status(200).json(songs);
});
  
//create a new song, and return new song
router.post('/', (req, res) => {
    let newSong = {
        id: songs.length + 1,
        name: req.body.name,
        artist: req.body.artist 
    }
    songs.push(newSong);
    res.status(201).json(newSong);
});

//return a song with id 
router.get('/:id', (req, res) => {
    let song = songs.find(song => song.id == parseInt(req.params.id));
    res.status(200).json(song);
});

//edit a song with id, and return edited song
router.put('/:id', (req, res) => {
    let song = songs.find(song => song.id === parseInt(req.params.id));
    song.name = req.body.name;
    song.artist = req.body.artist;
    res.status(200).json(song);
});

//delete a song with id, and return deleted song
router.delete("/:id", (req, res) => {
    let songToDelete = songs.find(song => song.id === parseInt(req.params.id));
    let index = songs.indexOf(songToDelete);
    songs.splice(index, 1);
    res.status(200).json(songToDelete);
});

module.exports = router;