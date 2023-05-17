
module.exports = (sequelize,DataTypes,Model ) =>{

class emp extends Model {}

emp.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'empTable' // We need to choose the model name
});
}
// the defined model is the class itself
// console.log(emp === sequelize.models.empTable); // true