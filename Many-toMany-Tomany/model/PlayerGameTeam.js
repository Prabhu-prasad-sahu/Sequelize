module.exports = (sequelize, DataTypes) => {
    const PlayerGameTeam = sequelize.define('PlayerGameTeam', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });
    PlayerGameTeam.associate = (models) => {
        PlayerGameTeam.belongsTo(models.playerModel)
        PlayerGameTeam.belongsTo(models.GameTeam)

    }
    return PlayerGameTeam;
}