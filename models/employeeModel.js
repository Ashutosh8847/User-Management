const mongoose  = require('mongoose');
const {Schema} = mongoose;

const employee = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},
{
    timestamps:true
})

const Employee = mongoose.model("Employee", employee)
Employee.createIndexes()
module.exports = Employee;
