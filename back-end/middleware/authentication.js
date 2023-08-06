const { json } = require('express')
const jwt = require('jsonwebtoken')


const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    // res.send("token",token)
    if (token) {
        const decoded = jwt.verify(token, 'lecture')
        if (decoded) {
            next()
        }
        else {
            res.send("Please Login")
        }
    }
    else {
        res.send("Please Login")
        console.log(token)
    }
    // res.send(token)
}

module.exports = {
    authenticate
}