const express = require("express")
const fs = require('fs')
const app = express()
const cors = require('cors')
const { connection } = require("./db")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const {authenticate}=require("./middleware/authentication")
const { CreateAccountModel } = require("./model/create_account_model")
const { PrivatePlayListModel } = require("./model/private_playList_model")
const { PublicPlayListModel } = require("./model/public_playList_model")

app.use(express.json())
app.use(cors())


app.post("/addPublicPlaylistData", async (req, res) => {
    // console.log("public",req.body)
    // res.send(req.body)
    let data = req.body
    try {
        let public_data = new PublicPlayListModel(data)
        await public_data.save()
    } catch (err) {
        console.log("Error while adding public data", err)
    }
})

app.post("/addPrivatePlaylistData", async (req, res) => {
    //   console.log("Private",req.body)
    //   res.send(req.body)
    let data = req.body
    try {
        let public_data = new PrivatePlayListModel(data)
        await public_data.save()
        res.send({ "Data Added Successfully!": public_data })
    } catch (err) {
        console.log("Error while adding public data", err)
        res.send({ "Error while adding public data ": err })
    }
})

app.post("/createAccount", (req, res) => {
    // res.send(req.body)
    // console.log( req.body)
    // console.log(CreateAccountModel)
    const { name, email, password } = req.body
    // console.log( name, email, password )
    try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if (err) {
                console.log("error while hashing", err)
                res.send(err)
            } else {
                const gmfinity_user = new CreateAccountModel({ name, email, password: secure_password, })
                await gmfinity_user.save()

                // res.send({"User Registered!":secure_password})
                // console.log(user)
            }
        });

    } catch (err) {
        res.send("Something went wrong in Registration!")
        console.log(err)
    }

})

app.post("/login", async (req, res) => {

    const { email, password } = req.body
    // console.log("login",email, password)
    const data = await CreateAccountModel.find({ email })
    // console.log({
    //   "userLG":password,
    //   "DBpassword":data 
    // })
    try {
        if (data.length > 0) {
            bcrypt.compare(password, data[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ course: 'backend' }, 'lecture')
                    console.log({ "response msg": "Login Successfull!", "token": result })
                    res.send({ "response msg": "Login Successfull!", "token": token })
                }
                else {
                    res.send(err)
                    console.log({ "Something went wrong while decrupting!": err })
                }
            });
        }
        else {
            res.send("Incorrect mail id or password!")
            console.log("Incorrect mail id or password!")
        }
    } catch (err) {
        res.send(err)
        console.log("Something went wrong!")
    }

})

app.get("/fetchallpublicPlayListData", async (req, res) => {
    try {
        let data = await PublicPlayListModel.find();
        res.send("working")
        console.log("working")
    } catch (err) {
        res.send({ "Error While getting Public PlayList Data": err })
        console.log("Error While getting Public PlayList Data", err)
    }
})
app.get("/",async(req,res)=>{
    try{
        console.log("akhi");
        res.send("akhil")
    }catch(error){console.log(error);res.send(error)}
})

// app.use(authenticate)
app.get("/fetchPrivatePlayListData", async(req, res) => {
    try {
        let data = await PrivatePlayListModel.find()
        res.send({ "response": data })
        console.log({ "response": data })
    } catch (err) {
        res.send({ "Error While getting Public PlayList Data": err })
        console.log("Error While getting Public PlayList Data", err)
    }
})

app.listen(3500, async () => {
    try {
        await connection
        console.log("Server Connected to DB")
    } catch (err) {
        console.log("Error while connecting to DB ", err)
    }
    console.log("App is running on port 3500")
})  