const JwtStrategy = require("passport-jwt0").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt

module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: "secretPassword"
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log("decode jwt", decoded)
        return done(null, false)
    }))
}