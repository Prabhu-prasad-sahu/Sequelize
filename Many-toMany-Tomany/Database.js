const { Sequelize, DataTypes } = require("sequelize")

let sequelize = new Sequelize(
    'GameDB',
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
        console.log("connected sucessfully");
    }).catch((err) => {
        console.log(err);
    })

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.playerModel = require("./model/Player.model")(sequelize, DataTypes, db.GameTeam, db.PlayerGameTeam)
db.gameModel = require("./model/Game.model")(sequelize, DataTypes, db.teamModel, db.GameTeam)
db.teamModel = require("./model/Team.model")(sequelize, DataTypes, db.gameModel, db.GameTeam)
db.GameTeam = require('./model/GameTeam')(sequelize, DataTypes, db.teamModel, db.gameModel, db.playerModel)
db.PlayerGameTeam = require('./model/PlayerGameTeam')(sequelize, DataTypes, db.playerModel, db.GameTeam)


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        console.info('Calling association for model >> ', modelName)
        db[modelName].associate(db);
    }
});

db.sequelize.sync({ alter: true })   //{force: true},{alter :true}
// db.sequelize.drop()

module.exports = db