
const mongoose=require("mongoose")

const privatePlaylistSchema=mongoose.Schema({
    Title:String,
    Year:String,
    imdbID:String,
    Type:String,
    Poster:String
})

const PrivatePlayListModel=mongoose.model("privatePlayListModel",privatePlaylistSchema)

module.exports={
    PrivatePlayListModel 
}
