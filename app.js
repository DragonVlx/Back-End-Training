const express = require("express")
const middlewares = require("./middleware")
const app = express()
app.use(bodyParser.json())
const port = 3000


middlewares.setupMiddlewares(app)
// Routes
const authRoutes = require("./auth/router-auth").router
const teamsRoutes = require("./teams/router-teams").router


app.get("/", (req, res) => {
    res.status(200).send("Hello World")
})

app.use("/auth", authRoutes)
app.use("/teams", teamsRoutes)


app.listen(port, () => {
    console.log("Server started at port 3000")
})

exports.app = app
