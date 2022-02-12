const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err,req,res,next) => {
    let customError = {
        err: err.statusCode || 'StatusCodes.INTERNAL_SERVER_ERROR',
        msg : err.message || 'try again something went wrong'
    }


    
}