require('dotenv').config()
const express = require('express');

const { dbToConnection } = require('./config/dbConnection');



const app = express();
app.use(express.json());
let PORT =process.env.PORT||3005

app.listen(PORT, () => {
    dbToConnection()
    console.log(`server is running on ${PORT} port ! `)
})