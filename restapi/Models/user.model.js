
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User_Data', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: { msg: "It must be a valid Email address" },
            }
        }
    }, {
        createdAt: true,
        updatedAt: false,
    });
    console.log(User === sequelize.models.User_Data);
    return User
}