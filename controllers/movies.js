const fetch = require('node-fetch')
const Movie = require('../models/Movie')

module.exports = {
    getMovies: async (req,res)=>{
        console.log(req.user)
        try{
            const movieItems = await Movie.find({
                userId : req.user.id,
                deleted: false,
            })
            const moviesLeft = await Movie.countDocuments({
                userId : req.user.id, 
                watched: false,
                deleted: false,
            })
            const moviesDB = await Movie.find({
                recommend: true,
            })
            res.render('movies.ejs', {movies: movieItems, left: moviesLeft, dbMovies: moviesDB, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createMovie: async (req, res)=>{
        try{
            let search = req.body.movieItem.replace(" ", "+")
            const url = `https://api.themoviedb.org/3/search/multi?api_key=9ac0eb557b1857810d37cbef8fd0557b&query=${search}`
            //pass request of user input to the movie api to get title and image from api
            await fetch(url)
                .then(res => res.json()) // parse response as JSON
                .then(data => { 
                    //console.log(data.results[0].media_type)
                    //console.log(data)
                    if( data.results[0].media_type != "person"){
                        movieTitle = data.results[0].name || data.results[0].title
                        console.log(movieTitle)
                        image = `https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`
                        if (image.length <42) {image = "assets/placeholder.jpg"}}
                    else{movieTitle = ""}
                     
                })
                .catch(err => {
                    console.log(`error out possible bad search query? ${err}`)
                    movieTitle = ""
                })
                //if movietitle was found in the api add it to the list 
                console.log(movieTitle.toLowerCase())  
                if (movieTitle.length < req.body.movieItem.length + 3 && movieTitle.length > req.body.movieItem.length - 3){
                    await Movie.create({
                        movie: req.body.movieItem, 
                        watched: false, 
                        recommend: false, 
                        title: movieTitle, 
                        image: image, 
                        deleted: false,
                        userId: req.user.id
                    })
                        console.log('Movie has been added!')
                        res.redirect('/movies')
                }
                //if the movie title was not found in the database send a flash error to the user letting them know.
                else{   
                    let movieTitle = "" 
                    console.log(` ${req.body.movieItem} was not found or added!`)
                    req.flash("errors", `Could not find ${req.body.movieItem} please try another search`)
                    res.redirect('/movies')
                    
                }
        }catch(err){
            console.log(err)
        }
    },





    markWatched: async (req, res)=>{
        try{
            await Movie.findOneAndUpdate({_id:req.body.movieIdFromJSFile},{
                watched: true
            })
            console.log('Marked Watched')
            res.json('Marked Watched')
        }catch(err){
            console.log(err)
        }
    },
    markUnWatched: async (req, res)=>{
        try{
            await Movie.findOneAndUpdate({_id:req.body.movieIdFromJSFile},{
                watched: false
            })
            console.log('Marked unwatched')
            res.json('Marked unwatched')
        }catch(err){
            console.log(err)
        }
    },
    // recommendMovie: async (req, res)=>{
    //     try{
    //         await Movie.updateOne({_id:req.body.movieIdFromJSFile}, {
    //             $inc: { recommend: 1 }
    //     })
    //         console.log('Incresed recommend by 1')
    //         res.json('Incresed recommend by 1')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    recommendMovie: async (req, res)=>{
        try{
            const movies = await Movie.find({
                userId : req.user.id,
                deleted: false,
            })

            if({_id:req.body.movieIdFromJSFile.recommend} == true){
            await Movie.updateOne({_id:req.body.movieIdFromJSFile}, {
                recommend: false
            })}
            console.log('Recommended Movie')
            res.json('Recommended Movie')
        }catch(err){
            console.log(err)
        }
    },
    deleteMovie: async (req, res)=>{
       
        try{
            await Movie.updateOne({_id:req.body.movieIdFromJSFile},{
                deleted: true
            })
            console.log(req.body.movieIdFromJSFile)
            console.log('Show Deleted')
            res.json('Show Deleted')
        }catch(err){
            console.log(err)
        }
    }
}    