console.log("Hooked up")

/* The movieAPI has been hooked up! */

var movieAPI = "https://obsidian-dune-boater.glitch.me/movies";

console.log(movieAPI);

/* TODO'S:

Allow users to add new movies -- ALL SPECIFICATIONS DONE

- Allow users to edit existing movies:

- Give users the option to edit an existing movie

- A form should be pre-populated with the selected movie's details

Like creating a movie, this should not involve any page reloads,
instead your javascript code should make an ajax request when the
form is submitted.

*/



/* --------------- ADD MOVIE SECTION ---------------  */


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


/* Variables declared outside of function so they can be passed in. */

var movieTitleCustom = document.getElementById('movie-title-custom');
var movieRatingCustom = document.getElementById('movie-rating-custom');
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

function getMovies() {
    return fetch(movieAPI)
        .then((response) =>
            response.json());

}

getMovies().then((movies) => {

    $('#loader').css('display', 'none');

    function capitalizeName(str) {
        var array = str.split(" ");
        for (var i = 0; i < array.length; i++) {
            array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1).toLowerCase()
        }
        var strTwo = array.join(" ");
        return strTwo;
    }

    console.log(movies)
    movies.forEach((movie) => {
console.log(movie)
        $('#movies-div').append(
            `<div class="card col-md-4">
            <h3 class="card-title">${capitalizeName(movie.title)}</h3>
            <h6 class="card-text">${movie.genre}</h6>
            <img class="card-img-top" src="${movie.poster}">
             <div class="card-body">
            <p class="card-text">${movie.plot}</p>
            <p class="card-text">Rating: ${movie.rating}</p>
            
        <!-- Trigger/Open The Modal -->
<button class="myBtn">Open Modal</button>

<!-- The Modal -->
<div id="myModal${movie.id}" class="modal myModal">

    <!-- Modal content -->
    <div class="modal-content">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Edit a movie!</h3>

            <h4>Movie you would like to edit:</h4>
            <br>
            <h1>${movie.title}</h1>
            <input type="text" id="movie-title-new" value="${movie.title}">
            <br>
            <br>
            <input type="text" id="movie-rating-new">
            <br>
            <button type="button" id="submit" >Submit</button>

            </form>
        </div>
    </div>

</div>
            

            <button type="button"class="btn btn-primary float-right">Delete</button>
            
            
            </div>
            </div>`
        )
        loopingButtons()});


})




/* --------------- EDIT MOVIE SECTION ---------------  */

// var movieNumber = document.getElementById('movie-number');
var movieTitleEdit = document.getElementById('movie-title-new');
var movieRatingEdit = document.getElementById('movie-rating-new');

/* NOTE FOR ME:

This changes the movie data, but we need to do two things.

1. The data needs to update without refreshing the page.

2. It needs to return an AJAX request somehow.

* */

var button = document.getElementById("submit");

button.addEventListener('click', function (e) {

    e.preventDefault()

    // var movieNumberInput = movieNumber.value
    var movieTitleEditInput = movieTitleEdit.value
    var movieRatingEditInput = movieRatingEdit.value

    console.log(movieTitleEditInput)
    console.log(movieRatingEditInput)

    let editedMovie = {
        title: movieTitleEditInput,
        rating: movieRatingEditInput,
        // id: movieNumberInput
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
var modal = document.getElementById("myModal");

// Gets the button that opens the modal
var btns = document.getElementsByClassName("myBtn");

// Gets the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

function loopingButtons() {
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function (e) {
            modal.style.display = "block";
        });
    }
}




// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function (e) {
    modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (e) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
