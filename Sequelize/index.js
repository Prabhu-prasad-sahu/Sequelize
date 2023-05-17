const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
 'studentDB',
 'postgres',
 'prabhu123',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

sequelize.authenticate()
.then(()=>{
    console.log("connection pg successfully");
}).catch((err)=>{
    console.log(err);
})

const Student = sequelize.define('student',{
    id :{
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        // defaultValue : 'null'
    },
    age : {
        type : DataTypes.INTEGER
    }
})

Student.sync().then(()=>{
    // console.log("student table created successfully");
    // Student.create({
    //     id : 4,
    //     name : "bapi sahu",
    //     email : "bapi@gmail.com",
    //     age : "25"
    // }).then((res)=>{
    //     console.log(res);
    // }).catch((err)=>{
    //     console.log(err);
    // })
// =================================================
    Student.findOne({
        where : {
            id : "4"
        }
    }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
// ===============================================
    // Student.destroy({
    //     where: {
    //       id: 2
    //     }
    // }).then(() => {
    //     console.log("Successfully deleted record.")
    // }).catch((error) => {
    //     console.error('Failed to delete record : ', error);
    // })
    // ===============================================
    // Student.findAll({
    //     where : {
    //         age : "25"
    //     }
    // }).then((res) => {
    //         console.log(res)
    //     }).catch((error) => {
    //         console.error('Failed to delete record : ', error);
    //     })
}).catch((err)=>{
    console.log("error");
})
