const deleteBtn = document.querySelectorAll('.del')
const watchedBtn = document.querySelectorAll('.watchedMovie')
const unWatchedBtn = document.querySelectorAll('.unWatchedMovie')
const recommendBtn = document.querySelectorAll('.recommend')


// const movieItem = document.querySelectorAll('span.not')
// const movieWatched = document.querySelectorAll('span.watched')


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteMovie)
})

Array.from(watchedBtn).forEach((el)=>{
    el.addEventListener('click', markWatched)
})

Array.from(unWatchedBtn).forEach((el)=>{
    el.addEventListener('click', markUnWatched)
})

Array.from(recommendBtn).forEach((el)=>{
    el.addEventListener('click', recommendMovie)
})

// Array.from(movieItem).forEach((el)=>{
//     el.addEventListener('click', markWatched)
// })

// Array.from(movieWatched).forEach((el)=>{
//     el.addEventListener('click', markUnWatched)
// })

async function deleteMovie(){
    const movieId = this.parentNode.dataset.id
    try{
        const response = await fetch('movies/deleteMovie', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'movieIdFromJSFile': movieId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markWatched(){
    const movieId = this.parentNode.dataset.id
    try{
        const response = await fetch('movies/markWatched', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'movieIdFromJSFile': movieId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markUnWatched(){
    const movieId = this.parentNode.dataset.id
    try{
        const response = await fetch('movies/markUnWatched', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'movieIdFromJSFile': movieId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function recommendMovie(){
    //console.log('recommend clicked')
    const movieId = this.parentNode.dataset.id
    try{
        const response = await fetch('movies/recommendMovie', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'movieIdFromJSFile': movieId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*set the innerHTML to the title of the movie*/
            b.innerHTML = arr[i].title;
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].title + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          //}
        }
    });
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
  
//set up search by keyword        
let runSearch = function () {
    let matches = []
    let keyword = this.value
    let url = `https://api.themoviedb.org/3/search/movie?api_key=8833c81e6715de20a62fb3e2ddc97c58&query=${keyword}`
    fetch(url)
        .then(result => result.json())
        .then((data)=>{
            matches.push(...data.results)

            autocomplete(document.getElementById("myInput"), matches)            
        })
        .catch(function(err){
            alert(err);
        });
}

const searchInput = document.querySelector('#myInput')

searchInput.addEventListener('change', runSearch)
searchInput.addEventListener('keyup', runSearch)

