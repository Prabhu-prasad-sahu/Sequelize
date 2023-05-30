
const { emp, address, refer, tech } = require("../models/db")

const { Op, Sequelize, QueryTypes } = require('sequelize');
const Techdata = require("../models/tech.model");

const add = async (req, rsp) => {
        let User = await emp.create(
                {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                });
        rsp.send(User)
}
const bio = async (req, rsp) => {
        try {
                let data = await emp.findAll({
                        attributes: ['firstName', ['id', 'num_id']]
                })
                rsp.send(data)
        } catch (error) {
                rsp.send(error)
        }
}
const GetSetVertual = async (req, rsp) => {
        let user = await emp.findAll({
                where: {
                        firstName: 'Prabhuprasad'
                }
        });
        rsp.send(user)
}
const users = async (req, rsp) => {
        try {
                // let user = await emp.findAll();
                // rsp.status(200).send(user);
                const user = await emp.sequelize.query("SELECT * FROM emp_data", { type: QueryTypes.SELECT });
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
                // let User = await emp.create({
                //         firstName: req.body.firstName,
                //         lastName: req.body.lastName
                // })
                // if (User && User.id) {
                //         const add = await address.create({
                //                 city: req.body.city,
                //                 state: req.body.state,
                //                 district: req.body.district,
                //                 User_refer_id: User.id
                //         })
                //         console.log(User, add);
                //         try {
                //                 if (User.id && add.id) {
                //                         debugger;
                //                         console.info('in IF >> ', User.id + " -- " + add.id)
                //                         const addressRef = refer.create({
                //                                 empID: User.id,
                //                                 addressID: add.id
                //                         })
                //                         console.info('Add Ref >>> ', addressRef)
                //                 }
                //         } catch (error) {
                //                 console.log(error);
                //         }
                // }
                // rsp.send("successfully created")


                // =========================================
                let findUser = await emp.findAll({
                        // attributes: ['firstName', 'lastName'],
                        include: [{
                                model: address,
                                as: 'Address_details',
                                attributes: ['city', 'district', 'state']
                        }],
                        // where: {
                        //         id: 2
                        // }
                })
                rsp.json({ user: findUser })
                // =====================================================
                // let updateEmp = await emp.findAll({
                //         where: {
                //                 id: req.body.id
                //         },
                //         include: [{
                //                 model: address,
                //                 as: 'address_details',
                //                 attributes: ['city', 'district', 'state']
                //         }]
                // })
                // rsp.send(updateEmp);
                // if (updateEmp.id) {
                //         await address.create({
                //                 city: req.body.city,
                //                 state: req.body.state,
                //                 district: req.body.district,
                //                 User_refer_id: updateEmp.id
                //         })
                //         if (updateEmp.id && add.id) {
                //                 console.info('in IF >> ', User.id + " -- " + add.id)
                //                 const addressRef = refer.create({
                //                         empID: id,
                //                         addressID: add.id
                //                 })
                //                 console.info('Add Ref >>> ', addressRef)
                //         }
                // }
                // rsp.send("updated")
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

let eagerLoading = async (req, rsp) => {
        try {
                let User = await emp.findAll({
                        include: [{
                                model: address,
                                attributes: ['city', 'district', 'state'],
                                required: false,
                                right: true
                                //if u use INNER JOIN then required : true 
                                //if u use LEFT OUTER JOIN then no neeed to (required : true)
                                //if u use RIGHT OUTER JOIN then neeed to (required : true , right : true)

                        }]

                })
                rsp.send(User);
        } catch (error) {
                rsp
        }
}

let addTech = async (req, rsp) => {
        try {
                // let User = await emp.create({
                //         firstName: req.body.firstName,
                //         lastName: req.body.lastName
                // })
                // if (User && User.id) {
                //         let addtech = await tech.create({
                //                 technology: req.body.technology,
                //                 Tech_refer_id: User.id
                //         })

                // }
                // rsp.send("created succsessfully");
                // =====================================================================

                // Find one by fullName


                // include: [{
                //         model: tech,
                // }],


                let add = await emp.findAll({
                        include: [{ model: tech }]
                })

                console.info("emp-find all >>> ", add)
                rsp.json({ data: add })
        } catch (error) {
                rsp.send("error >>", error)
        }
}

module.exports = { users, bio, add, GetSetVertual, oneToOne, oneToMany, manyToMany, paranoid, eagerLoading, addTech }

