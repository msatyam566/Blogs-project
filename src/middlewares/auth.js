const jwt = require("jsonwebtoken")
const blogModel = require("../models/blogModel")


const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token)
            return res.status(401).send({ status: false, msg: "Token is not present in Header" })

        let decodedToken = jwt.verify(token, "satyam566")
        if (decodedToken) {
            req.decodedToken = decodedToken
            console.log(req.decodedToken)
            next()
        } else {
            return res.status(401).send({ status: false, msg: "Token is invalid" })
        }

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



const authorization = function (req, res, next) {

    try {
        let token = req.headers["x-api-key"]
        if (!token)
            return res.status(401).send({ status: false, msg: "Token not present" })

        let decodedToken = jwt.verify(token, "satyam566")
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "Token is invalid" })

        let userToBeModified = req.params.authorId
        let userLoggedIn = decodedToken.authorId
        if (userToBeModified == userLoggedIn)

        return res.status(400).send({status: false, msg:"User is not allowed for logged in"})
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }


}

module.exports.authorization = authorization
module.exports.authentication = authentication
