const chai = require("chai")
const chaiHtpp = require("chai-http")
const app = require("../../app").app

chai.use(chaiHtpp)
const usersController = require("../../controller/users")
const teamsController = require("../controller-teams")



describe("Suite de test de la ruta teams", () => {
    it("should return 401 when no JWT token available", (done) => {
        //When the call no have a key correctly
        chai.request(app)
            .get("/auth/teams")
            .set("content-type", "applicaton/json")
            .send({ user: "mastermind", password: "4321" })
            .end((err, res) => {
                // expect valid login
                chai.assert.equal(res.statusCode, 201)
                chai.request(app)
                    .get("/teams")
                    .set("Authorization", `${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200)
                        chai.assert.equal(res.body.trainer, "Johan")
                        chai.assert.equal(res.body.team.length, 2)
                        chai.assert.equal(res.body[0].name, "Charizard")
                        chai.assert.equal(res.body.team[1].name, "Pikachu")
                        done()
                    })
            })
    })
})