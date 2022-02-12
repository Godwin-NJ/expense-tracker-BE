const { StatusCodes } = require('http-status-codes')
const CustomerError = require('./customErrorRequest')

class BadRequestError extends CustomerError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError

