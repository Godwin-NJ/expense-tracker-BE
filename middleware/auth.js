const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');




const auth = async(req,res,next) => {
    const authUser = await req.headers.authorization;
    if(!authUser && !authUser.startsWith("Bearer ")){
       throw new Error('authUser  error')
    }

    const token = authUser.split(" ")[1]
    
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        //understand reason behind assigning req.user to payload data
        req.user = {name: payload.name,Id: payload.userId}
        next()
    } catch (error) {
        throw new Error('payload  error')
    }
}


module.exports = auth