const { Sequelize, DataTypes } = require('sequelize')

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

db.address = require('./address.Model')(sequelize, DataTypes)
db.emp = require('./empData.Model')(sequelize, DataTypes)
db.empAddrefer = require('./refer.model')(sequelize, DataTypes, db.address, db.emp)

db.emp.hasMany(db.address, {
    foreignKey: "User_refer_id",
    as: 'address_details'
});
db.address.belongsTo(db.emp, {
    foreignKey: "User_refer_id",
    as: 'User_details'
});

// both are applicable  
// db.emp.belongsToMany(db.address, { through: 'emp_Add' });
// db.address.belongsToMany(db.emp, { through: 'emp_Add' });

// db.emp.belongsToMany(db.address, { through: db.empAddrefer });
// db.address.belongsToMany(db.emp, { through: db.empAddrefer });

db.sequelize.sync({ alter: true })   //{force: true},{alter :true}
// db.sequelize.drop()


module.exports = db;
