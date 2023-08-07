
const mongoose=require("mongoose")

const createAccountSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const CreateAccountModel=mongoose.model("userCreateAccount",createAccountSchema)

module.exports={
    CreateAccountModel
}
