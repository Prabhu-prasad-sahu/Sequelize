
module.exports = (sequelize, DataTypes, gameModel, GameTeam) => {
    const Team = sequelize.define("teamTable", {
        Name: {
            type: DataTypes.STRING
        }
    })
    Team.associate = (models) => {
        Team.belongsToMany(models.gameModel, { through: "GameTeam" })
        Team.hasMany(models.GameTeam, {
            foreignKey: 'teamReferID'

        })
    }
    return Team;
}