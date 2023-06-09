

module.exports = (sequelize, DataTypes, GameTeam, PlayerGameTeam) => {
    let Player = sequelize.define("playerTable", {
        Name: DataTypes.STRING
    })
    Player.associate = (models) => {
        Player.hasMany(models.PlayerGameTeam, {
            foreignKey: 'PlayerReferID'
        })
        Player.belongsToMany(models.GameTeam, { through: 'PlayerGameTeam' })
    }
    return Player;
}