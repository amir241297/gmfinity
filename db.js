const mongoose=require("mongoose")
// mongodb+srv://amir:amirkhan@cluster0.et7jah3.mongodb.net/GmfinityDB?retryWrites=true&w=majority
const connection=mongoose.connect("mongodb+srv://amir:amirkhan@cluster0.et7jah3.mongodb.net/GmfinityDB?retryWrites=true&w=majority")

module.exports={ 
    connection
}   