// const { emp, address } = require("./db");

module.exports = (sequelize, DataTypes, emp, address) => {
    const refer = sequelize.define('referal', {
        empID: {
            type: DataTypes.INTEGER,
            references: {
                model: address,
                key: 'id'
            }
        },
        addressID: {
            type: DataTypes.INTEGER,
            references: {
                model: emp,
                key: 'id'
            }
        }
    },
        {
            timestamps: false
        }
    );
    refer.associate = models => {
        emp.belongsToMany(address, { through: refer });
        address.belongsToMany(emp, { through: refer });
    }
    return refer
}