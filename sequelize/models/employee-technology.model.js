module.exports = (sequelize, DataTypes, employeeModel) => {
    let EmployeeTechnologyModel = sequelize.define('employee_techonologies', {
        technology_title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        paranoid: true,
        deletedAt: "Soft_delete" // 
    });


    EmployeeTechnologyModel.associate = (models) => {
        EmployeeTechnologyModel.belongsToMany(models.employeeModel, { through: 'employee_tech' })
    }

    return EmployeeTechnologyModel;
}