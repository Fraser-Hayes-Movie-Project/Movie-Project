console.log("Hooked up")

/* The movieAPI has been hooked up! */


var movieAPI = "https://obsidian-dune-boater.glitch.me/movies";

/* SearchForAMovie function (lines 12-54) pulls in the OMDB API
and look through their database based on the user search input. Then, it displays
the new movie (lines 30-53) */

function searchForAMovie(movieName) {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=5a824055&t=${movieName}&plot=full`;
    // console.log(url);
    const options = {
        method: 'GET',
    };


    fetch(url, options)
        .then(response => response.json())
        .then((data) => {
                console.log(data)
                console.log(data.Plot);
                alert("Your search has been added to your favorite movies!")

/* Appending OMDB data (lines 29-52) */

                $('#movies-div').append(
                    `
                <div class="card col-md-4 flip-card" id="${data.imdbID}">
                <div class="flip-card-inner">
                
                
                    <div class="flip-card-front">
                        <img class="card-img-top" src="${data.Poster}">
                    </div>
                      <div class="flip-card-back">
                        <h3 class="card-title">${data.Title}</h3>
                         <h6 class="card-text">${data.Genre}</h6>
                        <div class="card-body">
                        <p class="card-text">${data.Plot}</p>
                        <p class="card-text">Rating: ${data.imdbRating}</p>
                        
                        <button type="button" class="btn btn-primary">You cannot edit or delete this movie!</button>
                        
                    </div>
                    
                </div>
                    
                </div>    
             </div>`
                )})
        .catch(error => console.log((error)));

}

/* The omdb button is the "search" button. On click, execute
 searchForAMovie function (lines 12-54) */

    $('#omdb-btn').on("click", function (e) {
        e.preventDefault()
        var omdbUserInput = $('#site-search').val()
        //console.log(omdbUserInput)
        searchForAMovie(omdbUserInput)

    })



/* --------------- ADD MOVIE SECTION ---------------  */


/* Variables declared outside of function so they can be passed in (global). */

var movieTitleCustom = document.getElementById('movie-title-custom');
var movieRatingCustom = document.getElementById('movie-rating-custom');
var movieGenreCustom = document.getElementById('movie-genre-custom');
var movieDescCustom = document.getElementById('movie-description-custom');
var movieImageCustom = document.getElementById('url');
var button2 = document.getElementById("add-movie");


/* NOTES FOR ME:
This function grabs the user's inputs for adding a movie, then posts them.
Everything is activated once the button is clicked, thus all the
code is inside the event listener.
 */

button2.addEventListener('click', function (e) {

    /* Allows code to pick up user's input */

    e.preventDefault()
    var movieTitleInput = movieTitleCustom.value
    var movieRatingInput = movieRatingCustom.value
    var movieGenreInput = movieGenreCustom.value
    var movieDescInput = movieDescCustom.value
    var movieURLInput = movieImageCustom.value
    console.log(movieTitleInput + " " + movieRatingInput)

    let newMovie = {
        title: movieTitleInput,
        rating: movieRatingInput,
        genre: movieGenreInput,
        plot: movieDescInput,
        poster: movieURLInput
    };

    /* Allows user's input to be sent to database */

    function createNewMovie(movie) {

        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie) //converts the JS Object into a JSON string before sending
            // it up to the server.
        }
        return fetch(`${movieAPI}`, options)
            .then((response) =>
                response.json())

    }

    /* Passes newMovie object in createNewMovie function */

    createNewMovie(newMovie).then((newMovie) =>
    {
        console.log(newMovie)
        location.reload(true);
    });


    /* Logs new movie */
    console.log("User just added movie! The movie is: " + newMovie.title)


})

/* --------------- LOAD MOVIE SECTION ---------------  */

/* Gets all the movies from the database */

function getMovies() {
    return fetch(movieAPI)
        .then((response) =>
            response.json());

}

/* after it gets everything, it appends it all (lines 163-201) */

getMovies().then((movies) => {

    $('#loader').css('display', 'none');

    console.log(movies)
    movies.forEach((movie) => {

        $('#movies-div').append(

            `<div class="card col-md-4 flip-card" id="${movie.id}">
            <div class="flip-card-inner">
            
            <div class="flip-card-front">
            <img class="card-img-top" src="${movie.poster}">
            </div>
            
            <div class="flip-card-back">
            <h3 class="card-title">${movie.title}</h3>
            <h6 class="card-text">${movie.genre}</h6>
             <div class="card-body">
            <p class="card-text">${movie.plot}</p>
            <p class="card-text">Rating: ${movie.rating}</p>
            
            
      
            
<!-- Trigger/Open The Modal -->

<!-- All these data attributes stores whatever is in this input and allows it to be shown in their
respective modals. Think of these as mini-identifiers but JUST for data. -->

<button class="btn btn-primary myBtn float-left" 
data-movie-id="${movie.id}" 
data-movie-title="${movie.title}" 
data-movie-rating="${movie.rating}"
data-movie-genre="${movie.genre}"
data-movie-description="${movie.plot}"
data-movie-poster="${movie.poster}"
>Edit Movie<img class="pencil" src="https://cdn-icons.flaticon.com/png/512/2280/premium/2280557.png?token=exp=1634617541~hmac=e8530c8cf47886059196b1b3691c00eb"</button>
            <button type="button" class="btn btn-primary float-right btnDelete" data-movie-id="${movie.id}">Delete<img class="trash" src="https://cdn-icons.flaticon.com/png/512/914/premium/914343.png?token=exp=1634617657~hmac=b68b1200b09ac1f0ec5ecc65197d7034"></button>
   
           </div>
            </div>
            </div>
            </div> <!-- FLip card animation stops here  -->    
             `)
    });

    editButton(); //Calls editButton function (lines 293-306)

    deleteButton(); //Calls deleteButton function (lines 325-336)

})




/* --------------- EDIT MOVIE SECTION ---------------  */

// var movieNumber = document.getElementById('movie-number');
var movieTitleEdit = document.getElementById('movie-title-new');
var movieRatingEdit = document.getElementById('movie-rating-new');
var movieId = document.getElementById('movie-id');
var movieGenreEdit = document.getElementById('movie-genre-new');
var movieDescEdit = document.getElementById('movie-description-new');
var movieURLEdit = document.getElementById('movie-image-new');

/* NOTE FOR ME:
All the variables above pull from the input boxes; the value of them is stored so it can be
rendered as a movie. When you hit "submit", the user created movie is converted into a movie
like the others (lines 231-274)
* */

var button = document.getElementById("submit");

button.addEventListener('click', function (e) {

    e.preventDefault()

    var movieNumberInput = movieId.value
    var movieTitleEditInput = movieTitleEdit.value
    var movieRatingEditInput = movieRatingEdit.value
    var movieGenreEditInput = movieGenreEdit.value
    var movieDescEditInput = movieDescEdit.value
    var movieURLEditInput = movieURLEdit.value

    console.log(movieTitleEditInput)
    console.log(movieRatingEditInput)

    let editedMovie = {
        title: movieTitleEditInput,
        rating: movieRatingEditInput,
        id: movieNumberInput,
        genre: movieGenreEditInput,
        plot: movieDescEditInput,
        poster: movieURLEditInput,
    };

    function editMovie(data) {

        let options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) //converts the JS Object into a JSON string
            // before sending it up to the server.
        }
        return fetch(`${movieAPI}/${data.id}`, options)
            .then((response) => response.json())

    }

    editMovie(editedMovie).then((data) => {
        console.log(data)
        location.reload(true);
    });

});

/* MODAL SETTINGS */

// Gets the modal
var modal = document.getElementById("modal");
// console.log(modal)

// Gets the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Gets the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var btnDelete = document.getElementsByClassName("btnDelete");


// When the user clicks on any button, open the modal and call the given movie data to be displayed

function editButton() {
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function (e) {
            modal.style.display = "block";
            console.log(this.dataset.movieTitle)

            document.getElementById("movie-title-new").value = this.dataset.movieTitle;
            document.getElementById("movie-rating-new").value = this.dataset.movieRating;
            document.getElementById("movie-id").value = this.dataset.movieId;
            document.getElementById("movie-genre-new").value = this.dataset.movieGenre;
            document.getElementById("movie-description-new").value = this.dataset.movieDescription;
            document.getElementById("movie-image-new").value = this.dataset.moviePoster;
        });
    }}


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
        .then((response) => location.reload(true));
}




function deleteButton() {
    for (var i = 0; i < btnDelete.length; i++) {
        console.log("hi")
        btnDelete[i].addEventListener('click', function (e) {
            e.preventDefault();
            deleteMovie(this.dataset.movieId)



        })}

}

//When the user clicks on <span> (x), close the modal
span.addEventListener('click', function (e) {
    modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (e) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});