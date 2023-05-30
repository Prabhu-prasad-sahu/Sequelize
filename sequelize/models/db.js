const { Sequelize, DataTypes, Model } = require('sequelize')

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

db.emp = require('./empData.Model')(sequelize, DataTypes)
// db.refer = require('./referal.model')(sequelize, DataTypes, db.address, db.emp)
db.address = require('./add.model')(sequelize, DataTypes, db.emp)
db.tech = require('./tech.model')(sequelize, DataTypes, db.emp)




// db.emp.hasOne(db.address, {
//     foreignKey: 'User_refer_id'
// });
// db.address.belongsTo(db.emp, {
//     foreignKey: 'User_refer_id'
// });

// db.emp.hasOne(db.tech, {
//     foreignKey: 'Tech_refer_id'
// });
// db.tech.belongsTo(db.emp, {
//     foreignKey: 'Tech_refer_id'
// });

// both are applicable  
// it will automatic create a refer table
// db.emp.belongsToMany(db.address, { through: 'emp_Add' });
// db.address.belongsToMany(db.emp, { through: 'emp_Add' });

// db.emp.belongsToMany(db.address, { through: db.empAddrefer });
// db.address.belongsToMany(db.emp, { through: db.empAddrefer });

db.sequelize.sync({ alter: true })   //{force: true},{alter :true}
// db.sequelize.drop()


module.exports = db;
