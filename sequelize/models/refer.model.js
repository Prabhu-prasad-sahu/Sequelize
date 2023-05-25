
module.exports = (sequelize, DataTypes, emp, address) => {
    const empAddRefer = sequelize.define('empAdRefer', {
        empId: {
            type: DataTypes.INTEGER,
            references: {
                model: emp,
                key: "id"
            }
        },
        addressId: {
            type: DataTypes.INTEGER,
            references: {
                model: address,
                key: "id"
            }
        }
    }, {
        timestamps: false
    });
    empAddRefer.associate = models => {
        empAddRefer.belongsTo(emp, {
            foreignKey: 'id'
        });
        empAddRefer.belongsTo(address, {
            foreignKey: 'id'
        });
    }
    return empAddRefer
}

