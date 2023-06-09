
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
  },
    // ==================================================================
    //method no -1 using hooks 
    //  {
    //   hooks: {
    //     beforeValidate: (user, options) => {
    //       user.lastName = 'samal';
    //     },
    //     // afterValidate: (user, options) => {
    //     //   user.username = 'Toni';
    //     // }
    //   }
    // },
    // ====================================================================
    {
      paranoid: true,
      deletedAt: "Soft_delete" // 
    }
  );

  emp.associate = (models) => {
    emp.addScope('firstScope', {
      where: {
        firstName: "Suman"
      }
    })
    emp.addScope('IncludeScope', {
      include: {
        model: models.Address,
        as: "employeeAddress",

      }
    })
    emp.hasMany(models.Address, {
      foreignKey: 'User_refer_id',
      as: "employeeAddress",
    });
  }

  emp.beforeCreate(async (user, options) => {
    user.lastName = "Samntroy";
  });

  // emp.afterValidate('myHookAfter', (user, options) => {
  //   user.username = 'Toni';
  // });

  emp.removeHook('afterCreate', 'myHookAfter');
  return emp;
}