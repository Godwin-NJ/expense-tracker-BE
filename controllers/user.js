const userModel = require('../models/user')
const {StatusCodes} = require('http-status-codes');

const createUser = async(req,res) => {
    const User = await userModel.create({...req.body})
    const token = User.createJwt()
    res.status(StatusCodes.CREATED).send({user :{name : User.userName},token})
}

const UserLogin = async(req,res) => {
    // const{body : {userName, password}} = req
    const {userName, password} = req.body
    const user = await userModel.findOne({userName})
    if(!user){
        throw new Error('incorrect login detail-user')
    }
    const userPassword = await user.comparePassword(password)
    if(!userPassword){
        throw new Error('incorrect login detail-pwd')
    }

    const token = user.createJwt()

    res.status(StatusCodes.OK).json({user: {name: user.userName},token})
}


const updateUserPassword = async() => {
    console.log('update password')
}


module.exports = {
    createUser,
    UserLogin
}