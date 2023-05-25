const express = require('express')
const app = express()
require('./Models/index.js')
let controller = require('./controller.js')


const port = 3000;
app.use(express.json())

app.get('/', (req, rsp) => {
    rsp.send("hello")
})

app.use('/user', controller)


app.listen(port, () => {
    console.log(`conneted to :- http://localhost:${port}`);
})