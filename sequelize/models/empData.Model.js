module.exports = (sequelize, DataTypes, Address, Techs) => {
  let emp = sequelize.define('emp_data', {
    firstName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      get() {   //getter function
        const rawValue = this.getDataValue('firstName');
        return rawValue ? 'MR .' + rawValue.toUpperCase() : null;
      }
    },
    lastName: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('lastName', value + " , indian");
      }
    }, fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    }
  }, {
    paranoid: true,
    deletedAt: "Soft_delete" // 
  });

  emp.associate = (models) => {
    emp.hasMany(models.Address, {
      foreignKey: 'User_refer_id',
      as: "employeeAddress"
    });
  }
  return emp;
}