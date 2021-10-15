console.log("Hooked up")

/* The movieAPI has been hooked up! */

var movieAPI = "https://obsidian-dune-boater.glitch.me/movies";

console.log(movieAPI);

/* TODO'S:

Allow users to add new movies -- ALL SPECIFICATIONS DONE



*/


/* This section grabs the user's inputs for searching a movie, then logs them. */

var movieTitle = document.getElementById('movie-title');
var movieRating = document.getElementById('movie-rating');
var button = document.getElementById("submit");


button.addEventListener('click', function (e) {
    e.preventDefault()
    var movieTitleInput = movieTitle.value
    var movieRatingInput = movieRating.value
    console.log(movieTitleInput + " " + movieRatingInput)
})




/* Gets all the movies */

function getMovies() {
    return fetch(movieAPI)
        .then((response) =>
            response.json());
}

getMovies().then((movies) => console.log(movies))


/* Used this function to clean up movies object */

function deleteMovie(id) {
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'db/json',
        },
    }
    fetch(`${movieAPI}/${id}`, options)
        .then((response) =>
            console.log("Deleted movie with id:" + id, response))
}

// deleteMovie(6)


/* This function grabs the user's inputs for adding a movie, then posts them. */

var movieTitleCustom = document.getElementById('movie-title-custom');
var movieRatingCustom = document.getElementById('movie-rating-custom');
var button2 = document.getElementById("add-movie");


/* NOTES FOR ME:

Everything is activated once the button is clicked, thus all the
code is inside the event listener.

 */

button2.addEventListener('click', function (e) {

    /* Allows code to pick up user's input */

    e.preventDefault()
    var movieTitleInput = movieTitleCustom.value
    var movieRatingInput = movieRatingCustom.value
    console.log(movieTitleInput + " " + movieRatingInput)

    let newMovie = {
        title: movieTitleInput,
        rating: movieRatingInput
    };

    /* Allows user's input to be sent to database */

    function createNewMovie(movie) {

        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie) //converts the JS Object into              a JSON string before sending it up to the server.
        }
        return fetch(`${movieAPI}`, options)
            .then((response) =>
                response.json())

    }

    /* Passes newMovie object in createNewMovie function */

    createNewMovie(newMovie).then((newMovie) =>
        console.log(newMovie));


    /* Logs new movie */
    console.log("User just added movie! The movie is: " + newMovie.title)
})




// createMovie(lilly).then((newMovie) => console.log(newMovie));