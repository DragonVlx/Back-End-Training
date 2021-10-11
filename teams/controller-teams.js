const teamDatabase = {}

const bootstrapTeam = (userName) => {
    teamDatabase[userName] = [{ name: "Charizard" }, { name: "Pikachu" }]
}

const getTeamOfUser = (userID) => {
    return teamDatabase[userID]
}

const addPokemon = (userID, pokemon) => {
    teamDatabase[userID].push(pokemon)
}

const deletePokemon = (userID, index) => {
    // console.log("DELETE",userID, index)
    if (teamDatabase[userID][index]) {
        teamDatabase[userID].splice(index, 1)
    }
}

const setTeam = (userID, team) => {
    teamDatabase[userID]
}

exports.bootstrapTeam = bootstrapTeam
exports.addPokemon = addPokemon
exports.setTeam = setTeam
exports.getTeamOfUser = getTeamOfUser
exports.deletePokemon = deletePokemon
