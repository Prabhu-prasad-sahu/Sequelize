const { Sequelize, DataTypes, Model } = require('sequelize');
// const employeeModel = require('./employee.model');

const sequelize = new Sequelize(
    'UserDatabase',
    'postgres',
    'prabhu123',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
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

db.emp = require('./empData.Model')(sequelize, DataTypes, db.Address)
db.Address = require('./add.model')(sequelize, DataTypes, db.emp, db.Tech)
db.Tech = require('./tech.model')(sequelize, DataTypes, db.emp, db.Address)
db.employeeModel = require('./employee.model')(sequelize, DataTypes, db.employeeTechnologyModel, db.empTech)
db.employeeTechnologyModel = require('./employee-technology.model')(sequelize, DataTypes, db.employeeModel, db.empTech)


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        console.info('Calling association for model >> ', modelName)
        db[modelName].associate(db);
    }
});



// both are applicable  
// it will automatic create a refer table
// db.emp.belongsToMany(db.address, { through: 'emp_Add' });
// db.address.belongsToMany(db.emp, { through: 'emp_Add' });

db.sequelize.sync({ alter: true })   //{force: true},{alter :true}
// db.sequelize.drop()


module.exports = db;
