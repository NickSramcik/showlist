const Showlist = require('../models/Showlist')


// db.customers.find({
//     "VIP": true,
//     "Country": "Germany"
//   })

module.exports = {
    getShowlist: async (req,res)=>{
        console.log(req.user)
        try{
            const showlistItems = await Showlist.find({
                // Find showlist items that belong to this user
                userId : req.user.id,
                // Find items that aren't deleted
                deleted : false
            })
            const itemsLeft = await Showlist.countDocuments({
                // Count items that belong to this user, aren't watched, and aren't deleted
                userId : req.user.id,
                watched : false, 
                deleted : false
            })
            // Pass off above data to the ejs file for processing
            res.render('showlist.ejs', {
                showlist: showlistItems, 
                left: itemsLeft, 
                user: req.user
            })
        }catch(err){
            console.log(err)
        }
    },
    createShow: async (req, res)=>{
        try{
            await Showlist.create({show: req.body.showlistItem, watched: false, deleted: false, userId: req.user.id})
            console.log('Show has been added!')
            res.redirect('/showlist')
        }catch(err){
            console.log(err)
        }
    },
    markWatched: async (req, res)=>{
        try{
            await Showlist.findOneAndUpdate({_id:req.body.showIdFromJSFile},{
                watched: true
            })
            console.log('Marked Watched')
            res.json('Marked Watched')
        }catch(err){
            console.log(err)
        }
    },
    markUnwatched: async (req, res)=>{
        try{
            await Showlist.findOneAndUpdate({_id:req.body.showIdFromJSFile},{
                watched: false
            })
            console.log('Marked Unwatched')
            res.json('Marked Unwatched')
        }catch(err){
            console.log(err)
        }
    },
    deleteShow: async (req, res)=>{
        console.log(req.body.showIdFromJSFile)
        try{
            await Showlist.findOneAndUpdate({_id:req.body.showIdFromJSFile},{
                deleted: true
            })
            console.log('Show Deleted')
            res.json('Show Deleted')
        }catch(err){
            console.log(err)
        }
    }
}    