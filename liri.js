// Variables and libraries ------------------------------------------------------- 
  
    require('dotenv').config()

    // For Multiple 
    var axios = require("axios");
    var moment = require("moment");

    // For Spotify
    var keys = require ('./keys.js');
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify); 

    // For Do What It Says
    var fs = require('fs');

    var commandName = process.argv[2];

    // The Searched Term
    var value = process.argv.slice(3).join(" ");

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
        doWhatItSays();
    }


// BANDS IN TOWN (concert-this) (WORKING)

function getConcerts (value) {
    
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function (response) {

        for (i = 0; i < response.data.length; i++) {
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city);
            var convertMoment = moment(response.data[i].datetime);
            console.log(convertMoment.format("MM DD YYYY"));
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
        
        if (response.tracks.total === 0) {
            songlessSpotify();
        } else {
        console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
        console.log("Song title: " + response.tracks.items[0].name);
        console.log("Preview of song: " + response.tracks.items[3].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("--------------------");   
        } 
    })
    .catch(function(err) {
        console.log("Woops! Something went wrong. " + err);
    });

}

function songlessSpotify (value) {

    spotify.search({
        type: 'track', 
        query: value,
    }).then(function(response) {

    for (var i=0;i < response.tracks.items.length; i++) {

        if (response.tracks.items[i].artists[0].name === "Ace of Base") {
        console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
        console.log("Song title: " + response.tracks.items[0].name);
        console.log("Preview of song: " + response.tracks.items[3].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("--------------------");    
        }
    }
    }).catch(function(err) {
        console.log("Woops! Something went wrong. " + err);
    });

}

// OMDB (movie-this) (WORKING)
function getMovieInfo (value) {

    axios.get("http://www.omdbapi.com/?t=" + value + "&apikey=trilogy")
    .then(function (response) {

        if (response.data.Title != undefined) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of Origin: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);
            console.log("--------------------");
        } else {
            getMovieInfo("Mr. Nobody");
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

// DO WHAT IT SAYS (WORKING)
function doWhatItSays () {

    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(",");
        getSongs(dataArr[1])
        if (error) {
          return console.log(error);
        }
    });
}