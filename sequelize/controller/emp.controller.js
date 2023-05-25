const { emp, address, empAddrefer } = require("../models/db")

const { Op, Sequelize, QueryTypes } = require('sequelize')
// await jane.destroy();         // for delete  
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
                let User = await emp.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                })
                if (User && User.id) {
                        await address.create({
                                city: req.body.city,
                                state: req.body.state,
                                district: req.body.district,
                                User_refer_id: User.id
                        })
                }
                // =======================================================
                // let User = await emp.findAll({
                //         attributes: ['firstName', 'lastName'],
                //         include: [{
                //                 model: address,
                //                 as: 'address_details',
                //                 attributes: ['city', 'district', 'state']
                //         }],
                //         where: {
                //                 id: 4
                //         }
                // })
                // ==============================================================
                let add = await address.findAll({
                        attributes: ['city', 'state'],
                        include: [{
                                model: emp,
                                as: 'User_details',
                        }],
                        where: {
                                // id: 4
                        }
                })
                // rsp.json({ add: add })
                rsp.json({ User: User })
        } catch (error) {
                rsp.send(error)
        }
}

let oneToMany = async (req, rsp) => {
        try {
                let id = req.body.id
                let user_data = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                }
                let User_id = await emp.update(user_data, {
                        where: {
                                id
                        }
                })
                if (id) {
                        await address.create({
                                city: req.body.city,
                                state: req.body.state,
                                district: req.body.district,
                                User_refer_id: id
                        })
                }
                // ==============================================================
                let User = await emp.findAll({
                        attributes: ['firstName', 'lastName'],
                        include: [{
                                model: address,
                                as: 'address_details',
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
                let User = await emp.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                })
                if (User && User.id) {
                        const addid = await address.create({
                                city: req.body.city,
                                state: req.body.state,
                                district: req.body.district,
                                User_refer_id: User.id
                        })
                        if (addid.id && User.id) {
                                // console.log(addid.id);
                                // console.log(User.id);

                                await empAddrefer.create({
                                        empId: User.id,
                                        addressId: addid.id
                                })
                        }
                }
                rsp.send("successfully created")


                // =========================================
                // let findUser = await emp.findAll({
                //         attributes: ['firstName', 'lastName'],
                //         include: [{
                //                 model: address,
                //                 as: 'address_details',
                //                 attributes: ['city', 'district', 'state']
                //         }],
                //         // where: {
                //         //         id: 1
                //         // }
                // })
                // rsp.json({ user: findUser })
        } catch (error) {
                rsp.send(error)
        }
}


module.exports = { users, bio, add, GetSetVertual, oneToOne, oneToMany, manyToMany }