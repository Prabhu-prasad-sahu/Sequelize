
module.exports = (sequelize, DataTypes, teamModel, GameTeam) => {
    const Game = sequelize.define("gameTable", {
        Name: {
            type: DataTypes.STRING
        }
    })
    Game.associate = (models) => {
        Game.belongsToMany(models.teamModel, { through: "GameTeam", as: "gameTeamData" })
        Game.hasMany(models.GameTeam, {
            foreignKey: 'gameReferID',
            as: "GameReferID"
        })

    }
    return Game;
}