
const { playerModel, teamModel, gameModel } = require('../Database')

let MtoMtoM = async (req, rsp) => {
    try {
        let result = await gameModel.create({
            Name: req.body.Name,
            GameReferID: [{
                Name: req.body.Name1
            }]
        }, {
            include: [{
                model: teamModel,
                as: 'gameTeamData'
            }, {
                model: gameModel,
                as: "GameReferID"
            }]
        })
        rsp.send(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    MtoMtoM
}