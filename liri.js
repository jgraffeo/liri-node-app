// Variables and libraries ------------------------------------------------------- 
  
    // For Multiple 
    var axios = require("axios");
    var moment = require("moment");

    // For Spotify
    var keys = require ('./keys.js');
    var Spotify = require('node-spotify-api');
    // var spotify = new Spotify(keys.spotify); //THIS DESTROYS BANDSINTOWN CODE - WHY?

    // For Do What It Says
    var fs = require('fs');

    var commandName = process.argv[2];

    // The Searched Term
    var value = process.argv[3];
//--------------------------------------------------------------------------------

if (commandName === "concert-this") {
    console.log("concert-this");
    getConcerts(value);
}

if (commandName === "spotify-this-song") {
    console.log("spotify-this-song");
    getSongs(value);
}

if (commandName === "movie-this") {
    console.log("movie-this");
    getMovieInfo(value);
}

if (commandName === "do-what-it-says") {
    console.log("do-what-it-says");
    doWhatItSays(whatever);
}

// BANDS IN TOWN (concert-this) (WORKING)

function getConcerts (value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function (response) {
        // console.log(response);
        for (i = 0; i < response.data.length; i++) {
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city);
            console.log(response.data[i].datetime);
            console.log("--------------------");
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

// SPOTIFY (spotify-this-song)

function getSongs (value) {

    spotify.search({
        type: 'track', 
        query: value,
    }).then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log("Woops! Something went wrong. " + err);
    });

    console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
    console.log("Song title: " + response.tracks.items[0].name);
    console.log("Preview of song: " + response.tracks.items[3].preview_url);
    console.log("Album: " + response.tracks.items[0].album.name);
    console.log("--------------------");

}

// OMDB (movie-this)
function getMovieInfo (value) {
     
    axios.get("http://www.omdbapi.com/?t=" + value + "&apikey=trilogy")
    .then(function (response) {
            console.log("Title: " + response.data.title);
            console.log("Year: " + response.data.year);
            console.log("IMDB Rating: " + response.data.Ratings[0].value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value);
            console.log("Country of Origin: " + response.data.country);
            console.log("Language: " + response.data.language);
            console.log("Plot: " + response.data.plot);
            console.log("Cast: " + response.data.actors);
            console.log("--------------------");
        
    })
    .catch(function (error) {
        console.log(error);
    });
}

// 4. `node liri.js do-what-it-says`

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use 
// it to call one of LIRI's commands.

// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in 
// `random.txt`.

// * Edit the text in random.txt to test out the feature for movie-this and concert-this.


function doWhatItSays (whatever) {
    fs.appendFile('random.txt', whatever, function (err) {
        if (err) throw err;
      });
}