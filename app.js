const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const PORT = 3000

app.use(express.static('client'));
app.use(express.json())

let songs = [];
let id = 0;

//return list of all songs


//create a new song, and return new song


//return a song with id 


//edit a song with id, and return edited song


//delete a song with id, and return deleted song


app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
