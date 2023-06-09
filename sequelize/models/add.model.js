module.exports = (sequelize, DataTypes) => {


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
        }
    }, {
        modelName: 'tag',
        createdAt: true,
        updatedAt: false
    })

    empAddress.associate = (models) => {
        empAddress.hasMany(models.Tech, {
            foreignKey: 'Tech_refer_id',
            as: "Add_Tech"
        })
        empAddress.belongsTo(models.emp, {
            foreignKey: 'User_refer_id',
            as: 'employeeAddress'
        });


    }
    return empAddress;
}

