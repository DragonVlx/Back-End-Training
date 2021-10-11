const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()
const usersController = require("./controller-users")
// Generate User
usersController.registerUser("Johan Velandia", "1234")

router.route("/")
    .get((req, res) => {
        res.send("GET Auth Router")
    })
    .post((req, res) => {
        res.send("POST Auth Route")
    })

router.route("/login")
    .post((req, res) => {
        if (!req.body) {
            return res.status(400).json({ message: "Missing data" })
        } else if (!req.body.user || !req.body.password) {
            return res.status(400).json({ message: "Lost data" })
        }
        // Comprobate credentials
        usersController.checkCredentiasl(req.body.user, req.body.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: "Ivalid Credentials" })
            }
            // if credentias as true
            let user = usersController.getUserIdFromUserName(req.body.user)
            const token = jwt.sign({ userID: user.userID }, "secretPassword")
            res.status(200).json({ token: token })
        })
    })

exports.router = router