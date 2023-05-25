const express = require('express')
const router = express.Router();
const user = require('./Controller/user.controller')

router.post('/add', user.addUser)
router.get('/all', user.allUser)
router.get('/data', user.bio)
router.get('/:id', user.findUser)
router.delete('/:id', user.deleteUser)
router.put('/:id', user.updateUser)




module.exports = router;