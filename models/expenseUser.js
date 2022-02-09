const mongoose = require( 'mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    title : {
        type: String,
        unique: true,
        required: true
    },
    expenseType : {
        type: String,
        enum : ['office supplies', 'Education|training', 'Feeding','Housing','transport'],
        required: true
    },

    amount : {
        type:Number,
        required: true
    },
    date : {
        type : Date,
        required: true
    }
})



const expenseUser = mongoose.model('Expense',userSchema)

// N/B FOR FOR NOW I USED THE UNIQUE KEY WORLD TO VALIDATE 
// THE ENTRY TO AVOID REPETION OF ENTRY TITLE & DATE
// if user already exist 
// userSchema.path('title').validate(function(value){
//     expenseUser.findOne({title : value},'expenseType', function(err,user){
//         if(err) console.log(err)
//         if (user) throw new Error('user already exist');
//     });
// }, 'already exist')


module.exports = expenseUser


