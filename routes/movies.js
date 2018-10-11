const express = require('express');
const router = express.Router()
const _ = require('lodash');

let movies = [];
let movieID = 0;

// Movies API
router.get('/', (req, res) => {
    res.status(200).json(movies);
});
  
router.post('/', (req, res) => {
    let movie = req.body;
    movieID++;
    movie.id = movieID + '';
    movies.push(movie);
    res.status(201).json(movie);
});

router.get('/:id', (req, res) => {
    let movie = _.find(movies, {id: req.params.id});
    res.status(200).json(movie || {});
});

router.put('/:id', (req, res) => {
    let update = req.body;
    if (update.id) {
        delete update.id
    }
    let movie = _.findIndex(movies, {id: req.params.id});
    let updatedMovie = _.assign(movies[movie], update);
    res.status(200).json(updatedMovie);
});

router.delete("/:id", (req, res) => {
    let movieToDelete = movies[_.findIndex(movies, {id: req.params.id})];
    movies = movies.filter(movie => movie.id !== req.params.id);
    res.status(200).json(movieToDelete);
});

module.exports = router