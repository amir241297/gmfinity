
const mongoose=require("mongoose")

const publicPlaylistSchema=mongoose.Schema({
    Title:String,
    Year:String,
    imdbID:String,
    Type:String,
    Poster:String
})

const PublicPlayListModel=mongoose.model("publicPlayList",publicPlaylistSchema)

module.exports={
    PublicPlayListModel 
}
