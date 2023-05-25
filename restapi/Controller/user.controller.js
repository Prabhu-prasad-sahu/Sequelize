let { User } = require('../Models/index')
const addUser = async (req, rsp) => {
    try {
        let User_data = await User.create({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            email: req.body.email
        });
        rsp.send(User_data)
    } catch (error) {
        rsp.send(error)
    }
}

const allUser = async (req, rsp) => {
    try {
        let User_data = await User.findAll()
        if (User_data === null) {
            rsp.send('user is not found')
        } else {
            rsp.send(User_data)
        }
    } catch (error) {
        rsp.send(error)
    }
}
const deleteUser = async (req, rsp) => {
    const id = req.params.id
    try {
        const user = await User.destroy({
            where: {
                id
            }
        })
        if (user === null) {
            rsp.send("user is not found")
        } else {
            rsp.send(`${User.id} is deleted successfully`)
        }
    } catch (error) {
        rsp.send(error)
    }
}

const findUser = async (req, rsp) => {
    try {
        let User_Data = await User.findByPk(req.params.id)
        if (User_Data === null) {
            rsp.send('user data not found')
        } else {
            rsp.send(User_Data)
        }
    } catch (error) {
        rsp.send(error)
    }
}


const updateUser = async (req, rsp) => {
    try {
        const id = req.params.id
        const data = req.body
        let UpdateUser = await User.update(data, {
            where: {
                id
            }
        })
        if (UpdateUser === null) {
            rsp.send('user is not found')
        } else {
            rsp.send(`id :- ${id} and data :- ${data} update sucessfully`)
        }
    } catch (error) {
        rsp.send(error)
    }
}
const bio = async (req, rsp) => {
    try {
        let User_data = await User.findAll({
            attributes: ['name', ['age', 'num'], 'email']
        })
        rsp.send(User_data)
    } catch (error) {
        rsp.send(error)
    }
}
module.exports = { addUser, allUser, deleteUser, findUser, updateUser, bio }