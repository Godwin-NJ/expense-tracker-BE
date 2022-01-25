const mongoose = require('mongoose') ;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;


const userSchema = new Schema({
    userName : {
        type : String,
        required: [true,'Provide username'],
        unique : true
    },
    password : {
        type : String,
        required: [true,'Provide password']
    }
})


userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    const hash  = await bcrypt.hash(this.password, salt);
    this.password = hash
})

userSchema.methods.createJwt = function(){
    return jwt.sign(
        {userId:this._id,name:this.userName},
        process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
}

userSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
    
};





module.exports  = mongoose.model('user', userSchema)

