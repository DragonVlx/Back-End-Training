const uuid = require("uuid")
const crypto = require("./crypto.js")
const teams = require("../teams/controller-teams")
const userDatabase = {}
// userID - > password
const registerUser = (userName, password) => {
    let hash = crypto.hashPasswordSync(password)
    let userID = uuid.v4()
    userDatabase[userID] = {
        userName: userName,
        password: hash
    }

    teams.bootstrapTeam()
}
const getUser = (userID) => {
    return userDatabase[userID]
}
const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName == userName) {
            return userDatabase[user]
        }
    }
}

const checkCredentiasl = (userName, password, done) => {
    console.log("Verified user credential")
    let user = getUserIdFromUserName(userName)
    if (user) {
        crypto.comparePassWord(password, user.password, done)
    } else {
        done("User lost =(")
    }
}

exports.registerUser = registerUser
exports.checkCredentiasl = checkCredentiasl
exports.getUserIdFromUserName = getUserIdFromUserName
exports.getUser = getUser