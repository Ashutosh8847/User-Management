const express = require("express");
require('express-async-errors');

const dotenv = require('dotenv');
const mongoose = require('mongoose')
// const err = require('express-async-errors');
const app = express()
const cors = require('cors')
const pool = require('./database.js')


// config the port and mongodb url from .env 
dotenv.config()
const employeeroutes  = require('./controller/employeecontroller.js')

// // connect with mongoDB
// mongoose.connect(process.env.MONGO_DB_URL)
// .then(()=> console.log("****mongo connection successfull*****"))
// .catch((error)=>console.log("****error***",error))

// All Routes 
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');

// err()

// middleware 
// Use body-parser middleware
app.use(bodyParser.json());


app.use('/api/employees', employeeroutes)

// app.use((err, req , res, next)=>{
//   console.log(err)
//   res.status(500).send("Internal server error")
// })

pool.query('select * from employees')
  .then(data =>
    console.log("db connected successfully"),
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port http://localhost:${process.env.PORT}`)
    })
  )
  .catch(err =>
    console.log("db connection failed", err))


