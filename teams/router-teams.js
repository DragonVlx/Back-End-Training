const express = require("express")
const router = express.Router()
const passport = require("passport")
const app = require("../app")
require("../auth")(passport)
const axios = require("axios").default

const teamsController = require("./controller-teams")
const { getUser } = require("../auth/controller-users")

router.route("/")
    .get(passport.authenticate("jwt", { session: false }),
        (req, res, next) => {
            let user = getUser(req.user.userID)
            res.status(200).json({
                trainer: user.userName,
                team: teamsController.getTeamOfUser(req.user.userID)
            })
        })
    .put(passport.authenticate("jwt", { session: false }),
        (req, res) => {
            teamsController.setTeam(req.user.userID, req.body.team)
            res.status(200).send()
        })

router.route("/pokemons")
    .post(passport.authenticate("jwt", { session: false }), (req, res) => {
        let pokemonName = req.body.name

        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(function (response) {
                console.log(response.data.id)
                let pokemon = {
                    name: pokemonName,
                    pokedexNumber: response.data.id
                }
                teamsController.addPokemon(req.user.userID, pokemon)
                res.status(200).json(pokemon)
            })
            .catch(function (error) {
                res.status(400).send({ message: error })
                console.log(error)
            })
            .then(function () {

            })
    })

router.route("/pokemons/:pokeID")
    .delete(passport.authenticate("jwt", { session: false },
        (req, res) => {
            teamsController.deletePokemon(req.user.userID, req.params.pokeID)
        }))

exports.router = router