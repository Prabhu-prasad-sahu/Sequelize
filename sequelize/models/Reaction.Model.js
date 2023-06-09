
module.exports = (sequelize, DataTypes) => {
    let Reaction = sequelize.define("reactionTable", {
        type: DataTypes.STRING
    }, { timestamps: false });
    Reaction.associate = (module) => {
        Reaction.belongsTo(module.post)
    }
    return Reaction;
}