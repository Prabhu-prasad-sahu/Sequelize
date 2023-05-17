module.exports = (sequelize ,DataTypes) =>{

const User = sequelize.define('user_data' , {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    name : {
        allowNull : false , 
        type : DataTypes.STRING, 
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false   
    },
    age : {
        type : DataTypes.INTEGER
    }
},{
        createdAt : true,
        updatedAt : false
});
}

