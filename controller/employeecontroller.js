const express = require('express')
const router = express.Router()

const pool = require('../database.js')
const service = require('../services/employeeservices.js')

router.get('/', async (req, res, next) => {
    const data = await service.getallemployees()
    res.send(data)

})

router.get('/:id', async (req, res, next) => {
    const data = await service.getemployeebyid(req.params.id)
    if (data.length == 0) {
        res.status(404).send("user not found with given id:" + req.params.id)
    } else {
        // console.log("***exe data**", data)
        res.send(data)

    }

})
router.delete('/delete/:id', async(req,res,next)=>{
    try {
        const affectedRows = await service.deletebyid(req.params.id)
        // console.log("affected rows******",affectedRows)
        if (affectedRows == 0){
            res.send("user is not find")
        }else{
            res.send("data deleted successfully") 
        }     
    } catch (error) {
        res.send("something went wrong",error)
        
    }

})
router.post('/insert',async(req,res)=>{
    try {
        await service.insertdata(req,res)
    } catch (error) {
        console.log("***error***",error)
        res.status(500).json({message:"Internal server error"})
        
    }
})

router.put('/update/:id',async(req,res,next)=>{
    // console.log('req:', req);
  try {
    await service.updatedatabyid(req,res)
    
  } catch (error) {
    return res.status(500).json({message:"Internal server error"})  
  }
})
module.exports = router;

