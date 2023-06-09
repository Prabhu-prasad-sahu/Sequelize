module.exports = (sequelize, DataTypes, teamModel, playerModel) => {
    const gameTeam = sequelize.define("GameTeam", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    })
    gameTeam.associate = (models) => {
        gameTeam.belongsTo(models.teamModel)
        gameTeam.belongsTo(models.gameModel)
        gameTeam.belongsToMany(models.playerModel, { through: 'PlayerGameTeam' })
        gameTeam.hasMany(models.PlayerGameTeam, {
            foreignKey: 'GameTeamReferID'
        })
    }
    return gameTeam;
}