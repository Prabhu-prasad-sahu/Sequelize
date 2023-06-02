
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let empController = require('./controller/emp.controller')
const { emp } = require('./models/db')
require('./models/db')

const port = 3000
app.use(bodyParser.json())

app.post('/add', empController.add)
app.get('/bio', empController.bio)
app.get('/get', empController.GetSetVertual)
app.get('/all', empController.users)
app.get('/onetoone', empController.oneToOne)
app.get('/oneToMany', empController.oneToMany)
app.get('/manytomany', empController.manyToMany);
app.get("/panaroid", empController.paranoid)
app.get("/addtech", empController.addTech)
app.get("/m-to-m", empController.manyToMany)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
