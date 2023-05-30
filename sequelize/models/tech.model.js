
module.exports = (sequelize, DataTypes, emp) => {

    const tech = sequelize.define('Tech', {
        technology: {
            allowNull: false,
            type: DataTypes.STRING
        },
        Tech_refer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: emp,
                key: 'id'
            }
        }
    }, {
        createdAt: true,
        updatedAt: false
    })
    tech.associate = models => {
        emp.hasMany(tech, {
            through: tech
            // foreignKey: 'Tech_refer_id',
        });
        tech.belongsTo(emp, {
            through: tech
            // foreignKey: 'Tech_refer_id',
        })
    }

    // console.info("Associations are")
    return tech;
}

