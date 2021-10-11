const bcrypt = require("bcrypt")

const hashPassWord = (plainText, done) => {
    bcrypt.hash(plainText, 10, done)
}

const hashPassWordSync = (plainText) => {
    return bcrypt.hashSync(plainText, 10)
}

const comparePassword = (plainPassword, hashPassWord, done) => {
    bcrypt.compare(plainPassword, hashPassWord, done)
}

exports.hashPassWord = hashPassWord
exports.hashPassWordSync = hashPassWordSync
exports.comparePassword = comparePassword