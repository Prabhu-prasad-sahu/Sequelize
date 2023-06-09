
const { emp, Address, refer, Tech, employeeModel, employeeTechnologyModel, sequelize } = require("../models/db")
const { Op, Sequelize, QueryTypes } = require('sequelize');
;



const users = async (req, rsp) => {
        try {
                // let user = await emp.findAll();
                // rsp.status(200).send(user);
                const user = await emp.sequelize.query("SELECT * FROM employees", { type: QueryTypes.SELECT });
                // const user = await emp.sequelize.query('SELECT * FROM emp_data', {
                //         model: emp,
                //         mapToModel: true
                // });
                rsp.send(user);
        } catch (error) {
                rsp.send(error)
        }
}
const oneToOne = async (req, rsp) => {
        try {
                // let User = await emp.create({
                //         firstName: req.body.firstName,
                //         lastName: req.body.lastName
                // })
                // if (User && User.id) {
                //         await address.create({
                //                 city: req.body.city,
                //                 state: req.body.state,
                //                 district: req.body.district,
                //                 User_refer_id: User.id
                //         })
                // }
                // =======================================================
                let User = await emp.findAll({
                        attributes: ['firstName', 'lastName'],
                        include: [{
                                model: address,
                                as: 'address_details',
                                attributes: ['city', 'district', 'state']
                        }],
                        where: {
                                id: 4
                        }
                })
                // ==============================================================
                // let add = await address.findAll({
                //         attributes: ['city', 'state'],
                //         include: [{
                //                 model: emp,
                //                 as: 'User_details',
                //         }],
                //         where: {
                //                 id: 4
                //         }
                // })
                // rsp.json({ add: add })
                rsp.json({ User: User })
        } catch (error) {
                rsp.send(error)
        }
}

let oneToMany = async (req, rsp) => {
        try {
                // let id = req.body.id
                // let user_data = {
                //         firstName: req.body.firstName,
                //         lastName: req.body.lastName
                // }
                // let User_id = await emp.update(user_data, {
                //         where: {
                //                 id
                //         }
                // })
                // if (id) {
                //         await address.create({
                //                 city: req.body.city,
                //                 state: req.body.state,
                //                 district: req.body.district,
                //                 User_refer_id: id
                //         })
                // }
                // ==============================================================
                let User = await emp.findAll({
                        attributes: ['firstName', 'lastName'],
                        include: [{
                                model: address,
                                as: 'Address_details',
                                attributes: ['city', 'district', 'state']
                        }],
                        // where: {
                        //         id: 1
                        // }
                })
                rsp.json({ user: User })
                // rsp.send("update successfully")
        } catch (error) {
                rsp.send(error)
        }
}

let manyToMany = async (req, rsp) => {
        try {
                // try {
                //         let Data = await employeeModel.create({
                //                 firstName: req.body.firstName,
                //                 lastName: req.body.lastName,
                //                 EmpData: [{
                //                         technology_title: req.body.technology_title
                //                 }]
                //         }, {
                //                 include: [{
                //                         model: employeeTechnologyModel,
                //                         as: 'EmpData'
                //                 }]
                //         })
                //         rsp.send(Data)
                // } catch (error) {
                //         console.log(error);
                // }
                // =================================================================================================
                try {
                        const result = await employeeTechnologyModel.findAll({
                                include: [{
                                        model: employeeModel,
                                        as: 'EmpData',
                                }]
                        });
                        rsp.send(result);
                } catch (error) {
                        console.log(error);
                }

        } catch (error) {
                rsp.send(error)
        }
}

let paranoid = async (req, rsp) => {
        try {
                let user = await emp.destroy({
                        where: {
                                id: 2
                        },
                        force: true // for permanent delet from database
                });
                // await post.restore();  // it is use for restore the paranoid data which will be deleted
                rsp.send({ user })
        } catch (error) {
                rsp.send(error)
        }
}


let addTech = async (req, rsp) => {
        try {
                try {
                        let empData = await Address.create({
                                city: req.body.city,
                                state: req.body.state,
                                district: req.body.district,
                                employeeAddress: {
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                },
                                Add_Tech: {
                                        technology: req.body.technology
                                }
                        }, {
                                include: [{
                                        model: emp,
                                        as: 'employeeAddress'
                                }, {
                                        model: Tech,
                                        as: 'Add_Tech'
                                }]
                        });
                        rsp.send({ data: empData })
                } catch (error) {
                        console.log(error);
                }
                // ====================================================================
                // try {

                // 
                // let eagerLoading = await emp.findAll({
                //         // include: [{ all: true }],
                //         include: [{
                //                 model: Address,
                //                 as: "employeeAddress",
                //                 attributes: ["city", "state", "district"],
                //                 include: [{
                //                         model: Tech,
                //                         as: "Add_Tech",
                //                         required: false,
                //                         right: true
                //                 }]
                //         }],
                // })
                // rsp.send(eagerLoading);
                //if u use INNER JOIN then required : true 
                //if u use LEFT OUTER JOIN then no neeed to (required : true)
                //if u use RIGHT OUTER JOIN then neeed to (required : true , right : true)
                //get all data from referance table to use { all: true } 
                // =====================================

                // let lazyLoading = await emp.findOne()
                // const data = await lazyLoading.getTechs();
                // rsp.json({ DATA: data })
                // rsp.send(await lazyLoading.getTech())
                // rsp.send(lazyLoading)

                // } catch (exp) {
                //         console.error(exp)
                // }
        } catch (error) {
                rsp.send("error >>", error)
        }
}
let Scope = async (req, rsp) => {
        try {
                let data = await emp.scope(['firstScope', 'IncludeScope']).findAll();

                rsp.send(data)
        } catch (error) {
                console.log(error);
        }
}

let Transactions = async (req, rsp) => {
        let t = await sequelize.transaction()
        try {
                let data = await Address.create({
                        city: req.body.city,
                        state: req.body.state,
                        district: req.body.district,
                        employeeAddress: {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                        },
                        Add_Tech: {
                                technology: req.body.technology
                        }
                }, {
                        include: [{
                                model: emp,
                                as: 'employeeAddress'
                        }, {
                                model: Tech,
                                as: 'Add_Tech'
                        }]
                });
                await t.commit();
                rsp.send(t.commit())
                // rsp.send(data)


                // data['transaction Status'] = 'commit'
        } catch (error) {
                // console.log(error);
                await t.rollback();
                // rsp.send(t.rollback())
                // console.log('rollback');
                // data['transaction Status'] = 'rollback'
        }
}

let Hooks = async (req, rsp) => {
        try {
                let result = await emp.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                })
                rsp.send(result)
        } catch (error) {
                console.log(error);
        }
}
module.exports = {
        users, oneToOne, oneToMany, manyToMany, paranoid, addTech, Scope, Transactions, Hooks
}

