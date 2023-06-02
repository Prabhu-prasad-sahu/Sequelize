
module.exports = (sequelize, DataTypes, Address) => {

    const tech = sequelize.define('Tech', {
        technology: {
            allowNull: false,
            type: DataTypes.STRING
        },
        Tech_refer_id: {
            type: DataTypes.INTEGER,
        }
    }, {
        createdAt: true,
        updatedAt: false
    })
    tech.associate = (models) => {
        tech.belongsTo(models.Address, {
            foreignKey: 'Tech_refer_id',
            // as: "Add_Tech"

        })
    }
    return tech;
}

