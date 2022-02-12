const { StatusCodes } = require('http-status-codes')
const CustomerError = require('./customErrorRequest')

class UnauthenticatedError extends CustomerError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError

