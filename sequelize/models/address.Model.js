module.exports = (sequelize, DataTypes) => {

    const empAddress = sequelize.define('emp_address', {
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
            type: DataTypes.INTEGER
        }
    }, {
        createdAt: true,
        updatedAt: false
    });
    return empAddress;
}

