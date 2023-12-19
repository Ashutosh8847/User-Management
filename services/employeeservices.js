const express = require('express')
const pool = require('../database.js')

module.exports.getallemployees = async () => {
    try {
        const data = await pool.query("select * from employees")
        return data[0]

    } catch (error) {
        console.log("**error***", error)

    }
}

module.exports.getemployeebyid = async (id) => {
    try {
        // it is based on the mysql injection
        const data = await pool.query("select * from employees where id =" + id)
        // This is based on the mysql2 injection
        // const data = await pool.query("select * from employees where id = ?" , [id])

        // console.log("data",data)
        return data[0]
    } catch (error) {
        console.log("**error***", error)
        return res.status(500).json({message:"Internal server error"})

    }
}

module.exports.deletebyid = async (id) => {
    try {
        const data = await pool.query("DELETE FROM EMPLOYEES WHERE ID = " + id)
        // console.log("DElete data",data)
        return data[0].affectedRows

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports.insertdata = async (req, res) => {
    try {
        const { name, employee_code, salary } = req.body
        const [existingRecords] = await pool.query("select count(*) AS count from employees where employee_code = ?", [employee_code])
        console.log("****existingRecords****", existingRecords[0].count)
        if (existingRecords[0].count > 0) {
            res.status(400).json({ message: "user with same employee id is already in db" })
            return ;
        }
        const data = await pool.query("INSERT INTO EMPLOYEES (name ,employee_code,salary ) VALUES (?,?,?)", [name, employee_code, salary])
        console.log("Inserted data", data)
        return res.status(200).json({message:"Data inserted successfully",data})

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({message:"Internal server error"})

    }
}

module.exports.updatedatabyid = async(req,res) =>{
    console.log("req.body",req.body)
    try {
        const {name, employee_code, salary} = req.body
        const {id} = req.params
        const [existingUser] = await pool.query("SELECT COUNT(*) AS count FROM employees WHERE id = ?", [id]);
        console.log("****existingUser****", existingUser[0].count)

        if (existingUser[0].count === 0 ) {
            res.status(404).json({ message: "User with this id is not present in the database"  })
            return ;
        }

        const [existingRecords] = await pool.query("select count(*) AS count from employees where employee_code = ? and id = ? ", [employee_code,id])
        if (existingRecords[0].count > 0) {
            res.status(400).json({ message: "user with same employee id is already in db" })
            return ;
        }

        const data = await pool.query('UPDATE EMPLOYEES SET name=?, employee_code = ?, salary=?  WHERE id= ?',[name,employee_code,salary,id])
        console.log(data[0].affectedRows)
        if(data[0].affectedRows){
            res.status(200).send({message:"Data updated successfully",data})
        }
  
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
        
    }

}





