
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// require('./Sequelize/index')
require('./models/db')


const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})