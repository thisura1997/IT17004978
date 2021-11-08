//sample application
//required schema and const are declared


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//new schema decleration to get input and output

const FactorialSchema = new Schema({
//getting the entered values

    input: Number,
    result: Number
});

//final definition
//passing of values captured from user (keyboard input)
const FactorialModel = mongoose.model('Factorial', FactorialSchema);
module.exports = FactorialModel;