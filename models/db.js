const  { Sequelize , DataTypes ,Model  } = require('sequelize')

const sequelize = new Sequelize(
    'UserDatabase',
    'postgres',
    'prabhu123',
    {
        host : 'localhost',
        dialect: 'postgres',
        logging : false
    }
)

sequelize.authenticate()
.then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})

const db = {}
db.Sequelize = Sequelize ; 
db.sequelize = sequelize ;
db.User = require('./userModel')(sequelize, DataTypes )
db.emp = require('./emp')(sequelize,DataTypes,Model)
db.sequelize.sync()
// db.sequelize.drop()
module.exports = db ;
