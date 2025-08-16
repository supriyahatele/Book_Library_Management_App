require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { dbToConnection } = require('./config/dbConnection');
const { UserRouter } = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

let PORT =process.env.PORT||3005

app.use("/api/auth",UserRouter)

app.listen(PORT, () => {
    dbToConnection()
    console.log(`server is running on ${PORT} port ! `)
})