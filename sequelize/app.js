
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let empController = require('./controller/emp.controller')
let polyController = require("./controller/VICcontroller")
require('./models/db')

const port = 3000
app.use(bodyParser.json())

app.get('/onetoone', empController.oneToOne)
app.get('/oneToMany', empController.oneToMany)
app.get('/users', empController.users);
app.get("/panaroid", empController.paranoid)
app.get("/addtech", empController.addTech)
app.get("/m-to-m", empController.manyToMany)
app.get("/scope", empController.Scope)
app.get("/Transactions", empController.Transactions)
app.get("/hook", empController.Hooks)
app.get("/polyOneToMany", polyController.polyOneToMany)
app.get("/queryInterface", polyController.queryInterface)
app.get("/subqueries", polyController.SubQueries)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
