const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize(
    'UserDatabase',
    'postgres',
    'prabhu123',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    })

sequelize.authenticate()
    .then(() => {
        console.log("successfully to postgres");
    }).catch((err) => {
        console.log(err);
    })

let db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user.model')(sequelize, DataTypes)
db.sequelize.sync({ alter: true })

module.exports = db;
