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
            res.render('movies.ejs', {movies: movieItems, left: moviesLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createMovie: async (req, res)=>{
        try{
            await Movie.create({
                movie: req.body.movieItem, 
                watched: false, 
                recommend: false, 
                deleted: false,
                userId: req.user.id
            })
            console.log('Movie has been added!')
            res.redirect('/movies')
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
            await Movie.updateOne({_id:req.body.movieIdFromJSFile}, {
                recommend: true
            })
            console.log('Recommended Movie')
            res.json('Recommended Movie')
        }catch(err){
            console.log(err)
        }
    },
    deleteMovie: async (req, res)=>{
        console.log(req.body.movieIdFromJSFile)
        try{
            await Movie.updateOne({_id:req.body.movieIdFromJSFile},{
                deleted: true
            })
            console.log('Show Deleted')
            res.json('Show Deleted')
        }catch(err){
            console.log(err)
        }
    }
}    