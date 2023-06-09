let express = require('express');
let app = express()
const bodyParser = require('body-parser')
let controller = require("./Controller/controller")
require("./Database")

const Port = 8000
app.use(bodyParser.json())

app.get('/MtoMtoM', controller.MtoMtoM)

app.listen(Port, () => {
    console.log("connected port np 8000");
})