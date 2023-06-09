const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config()
console.log(process.env.POSTGRES_USER);
const sequelize = new Sequelize(
    'UserDatabase',
    'postgres',
    'prabhu123',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log("connected");
    }).catch((err) => {
        console.log(err);
    })

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes

db.emp = require('./empData.Model')(sequelize, DataTypes, db.Address)
db.Address = require('./add.model')(sequelize, DataTypes, db.emp, db.Tech)
db.Tech = require('./tech.model')(sequelize, DataTypes, db.emp, db.Address)
db.employeeModel = require('./employee.model')(sequelize, DataTypes, db.employeeTechnologyModel, db.empTech)
db.employeeTechnologyModel = require('./employee-technology.model')(sequelize, DataTypes, db.employeeModel, db.empTech)
db.image = require("./Image.Model")(sequelize, DataTypes)
db.video = require("./video.Model")(sequelize, DataTypes)
db.comment = require("./comment.Model")(sequelize, DataTypes)
db.recation = require("./Reaction.Model")(sequelize, DataTypes)
db.post = require("./Post.Model")(sequelize, DataTypes)





Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        console.info('Calling association for model >> ', modelName)
        db[modelName].associate(db);
    }
});

db.sequelize.sync({ alter: true })   //{force: true},{alter :true}
// db.sequelize.drop()


module.exports = db;
