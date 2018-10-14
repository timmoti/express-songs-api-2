const express = require('express');
const router = express.Router();
const _ = require('lodash');

let songs = [];
let songID = 0;
const DELAY = 100

const getSongs = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(songs);
          }, DELAY);
    });
}

const createSong = (song) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            songs.push(song);
            resolve(song)
        }, DELAY);
    });
}

const getSong = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let songFound = _.find(songs, {id: id});
            if (!songFound){
                reject(new Error())
            }
            return resolve(songFound);
        }, DELAY);
    })
}

const updateSong = (songToUpdate) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let id = songToUpdate.id
            let song = _.findIndex(songs, {id: id});
            if(song == -1) {
                reject(new Error());
            }
            let updatedSong = _.assign(songs[song], songToUpdate);
            resolve(updatedSong)
        }, DELAY);
    });
}

const deleteSong = (songToDeleteID) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let songToDelete = songs[_.findIndex(songs, {id: songToDeleteID})];
            if(!songToDelete) {
                reject(new Error())
            }
            songs = songs.filter(song => song.id !== songToDeleteID);
            resolve(songToDelete);
        }, DELAY)
    })
}

//Song API
//return list of all songs
router.get('/', async (req, res) => {
    try{
        let allsongs = await getSongs();
        res.status(200).json(songs);
    }
    catch(error){
        res.status(404).json({message: "unable to list all songs"})
    }
});
  
router.post('/', async (req, res) => {
    try{
        let song = req.body;
        songID++;
        song.id = songID + '';
        newSong = await createSong(song);
        res.status(201).json(newSong);
    }
    catch(error){
        res.status(404).json({message: "Unable to create new song" })
    }
  });

//return a song with id 
router.get('/:id', async (req, res) => {
    try {
        let songID = req.params.id;
        let song = await getSong(songID)
        res.status(200).json(song);
    }
    catch(error){
        res.status(404).json({message: `Unable to find song with id: ${req.params.id}` })
    }
});

//edit a song with id, and return edited song
router.put('/:id', async (req, res) => {
    try{
        let song = await updateSong(req.body)
        res.status(200).json(song);
    }
    catch(error){
        res.status(404).json({message: `Unable to update song with id: ${req.params.id}` })
    }
});

//delete a song with id, and return deleted song
router.delete("/:id", async (req, res) => {
    try{
        let songDeleted = await deleteSong(req.params.id)
        res.status(200).json(songDeleted);
    }
    catch(error){
        res.status(404).json({message: `Unable to delete song with id: ${req.params.id}` })
    }
});

module.exports = router;