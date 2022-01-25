const expenseUser = require('../models/expenseUser')
const {StatusCodes} = require('http-status-codes');
const res = require('express/lib/response');

const getAllEntry = async(req,res) => {
    const allExpense = await expenseUser.find({})
    res.status(StatusCodes.OK).json({allExpense})
}

const createEntry = async(req,res) => {
   
  const entry = await expenseUser.create({...req.body})
  
//   when expense already exist throw and error 
//   if(req.body.title && req.body.date){
//       throw new Error('expense already exist')
//   }
  res.status(StatusCodes.CREATED).json({entry})
}

const updateEntry = async(req,res) => {
    const{
        body : {title,expenseType,amount},
        params : {id:expenseID}
    } = req

    if(title === "" || expenseType === "" || amount === ""){
        throw new Error('Data is empty, kindly fill')
    }
    const updateExpense = await expenseUser.findOneAndUpdate({_id: expenseID}, req.body,{
        new : true, 
        runValidators: true
     })
     if(!updateExpense){
         throw new Error('error updating specified id')
     }
     res.status(StatusCodes.OK).json({updateExpense})
}

const deleteEntry = async(req,res) => {
    const { params : {id:expenseID}} = req
    const deleteExpense = await expenseUser.findByIdAndDelete({_id : expenseID})
        if(!deleteExpense){
            throw new Error('id does not exist')
        }
    res.status(StatusCodes.OK).json({deleteExpense})
}


module.exports = {
    getAllEntry,
    createEntry,
    updateEntry,
    deleteEntry
}