require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { dbToConnection } = require('./config/dbConnection');
const { UserRouter } = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');
const myBooksRouter = require('./routes/mybooksRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

let PORT =process.env.PORT||3005
app.get("/get",(req,res)=>{
    res.send({ msg:"app running "})
})
app.use("/api/auth",UserRouter)
app.use("/api",bookRouter)
app.use("/api",myBooksRouter)
app.listen(PORT, () => {
    dbToConnection()
    console.log(`server is running on ${PORT} port ! `)
})