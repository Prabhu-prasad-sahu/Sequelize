module.exports = (sequelize, DataTypes, employeeTechnologyModel) => {
    let EmployeeModel = sequelize.define('employee', {
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
        }
    }, {
        paranoid: true,
        deletedAt: "Soft_delete" // 
    });

    EmployeeModel.associate = (models) => {
        EmployeeModel.belongsToMany(models.employeeTechnologyModel, { through: 'employee_tech' })
    }

    return EmployeeModel;
}