const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const songRouter = require("./routes/songs");
const movieRouter = require("./routes/movies");

app.use(express.static('client'));
app.use(express.json())

app.use('/songs', songRouter);
app.use('/movies', movieRouter);


module.exports = app