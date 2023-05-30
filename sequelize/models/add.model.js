module.exports = (sequelize, DataTypes, emp, address) => {


    const empAddress = sequelize.define('address', {
        city: {
            allowNull: false,
            type: DataTypes.STRING
        },
        state: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        User_refer_id: {
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

    // empAddress.associate = models => {

    //     emp.hasOne(empAddress, {
    //         foreignKey: 'User_refer_id',
    //     });
    //     empAddress.belongsTo(emp, {
    //         foreignKey: 'User_refer_id',
    //     });
    // }
    return empAddress;
}

