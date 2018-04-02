require("dotenv").config();

// var spotify = new spotify(keys.spotify);
// var client = new twitter(keys.twitter);

// 1. Make it so liri.js can take in one of the following commands:

var fs = require("fs");
var file = "random.txt";

var nodeArgs = process.argv;
var action = process.argv[2];
var song = process.argv[3];
var movieee = process.argv[3];
// ==================================================================
if (process.argv[3] === undefined) {
    song = "The Sign",
    movieee = "Mr.Nobody"
}

if (action === "spotify-this-song") {
    spotifySong();
}
else if (action === "my-tweets") {
    tweetOn();
}
else if (action === "movie-this") {
    movieOn();
}
else if (action === "do-what-it-says") {
    doIt();
}
else {
    console.log("That is not a valid request.")
}



// ==================================================================

//===================================================================

// 'my-tweets'
// node liri.js my-tweets
// this will show your last 20 tweets and when they were created

function tweetOn() {

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '5w5G3AXFqcwb1to2zuLACPsOJ',
  consumer_secret: 'QufQmV6XD5bxtY4Vwdqa3F8PuyQG1YhGglqRizLzji3X9KYBZE',
  access_token_key: '2888819567-T7pheRtqPT4uH4NcPRij6IVsCRqzr0yxr3vzD6d',
  access_token_secret: "dR1hObiStA87Tyd0rHMG2eWdD5AtXGHTsE41aOenTyxDO"
});
 
var params = {screen_name: 'IverIverIverson'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    for (var i = 0; i < 20; i++) {

    console.log("---------------------------")
    console.log("")
    console.log("Tweet:")
    console.log(tweets[i].text);
    console.log("")
    console.log("Created on:")
    console.log(tweets[i].user.created_at);
    console.log("")
    console.log("---------------------------")
    }
  }
});
}
    
//===================================================================

// 'spotify-this-song'
// node liri.js spotify-this-song '<song name here>'
//This will show the following info
// artist - song name - a preview link from spotify - album name

function spotifySong() {

var spotify = require('node-spotify-api');

var spotify = new spotify({
    id: "4e8b8e6fd0b74fe58d6275bc62496dd5",
    secret: "1d1152ad4ca24ef28f36d1d19193ba73"
});

spotify.search({ type: 'track', query: song}, function(err, data) {
    if (err) {
        return console.log("error occured: " + err);
    }
    
    console.log("--------------------------")
    console.log("")
    console.log("Artist Name:")
    console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
    console.log("")
    console.log("Song Name:")
    console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
    console.log("")
    console.log("Preview Link:")
    console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
    console.log("")
    console.log("Album Title:")
    console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
    console.log("")
    console.log("--------------------------")


// THIS NEEDS TO GO SOMEWHERE ELSE? TO AVOID UNNEEDEED ERROR LOG WHEN RUNNING DO WHAT IT SAYS
// ACTUALLY WHY ISN'T THIS NEEDED???
    // for (var e = 2; e < process.argv[3].length; e++) {

    //     if (process.argv[3] === "") {
    //         song = "The Sign"
    //     }
    //     else {
    //     song = song + "" + process.argv[3][e];
    //     }
    // }

});
}

// ==================================================================

// 'movie-this'
// node liri.js movie-this '<movie name here>'
// the output should be...
//  * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

// Do I need this?
// var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

function movieOn() {

    var omdbApi = require('omdb-client');

    var params = {
        apiKey: '1a2d5e01',
        title: movieee,
    }
    omdbApi.get(params, function(err, data) {

        // console.log(JSON.stringify(data, null, 2))

        console.log("---------------------------------")
        console.log("")
        console.log("Title:")
        console.log(JSON.stringify(data.Title, null, 2))
        console.log("")
        console.log("Year:")
        console.log(JSON.stringify(data.Year, null, 2))
        console.log("")
        console.log("IMDB Rating:")
        console.log(JSON.stringify(data.imdbRating))
        console.log("")
        console.log("Rotten Tomatoes Score:")
        console.log(JSON.stringify(data.Ratings[1].Value))
        console.log("")
        console.log("Country of Production:")
        console.log(JSON.stringify(data.Country))
        console.log("")
        console.log("Language of this Movie:")
        console.log(JSON.stringify(data.Language))
        console.log("")
        console.log("Plot:")
        console.log(JSON.stringify(data.Plot))
        console.log("")
        console.log("Actors:")
        console.log(JSON.stringify(data.Actors))
        console.log("")
        console.log("---------------------------------")

    });
    console.log("movin' it")
}

// =================================================================

// 'do-what-it-says'
// node liri.js do-what-it-says
// using the fs node package, liri will take the text inside 
// random.txt and call one of it's commands
// it should run spotify-this-song for "I want it that way"

function doIt() {

    fs.readFile(file, "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        song = dataArr[1];
        moviee = dataArr[1];
        action = dataArr[0];

        if (action === "spotify-this-song") {
            spotifySong();
        }
        else if (action === "my-tweets") {
            tweetOn();
        }
        else if (action === "movie-this") {
            movieOn();
        }
        else if (action === "do-what-it-says") {
            doIt();
        }
        else {
            console.log("That is not a valid request.")
        }
    })
    
}

//===================================================================

