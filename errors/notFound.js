const { StatusCodes } = require('http-status-codes')
const CustomerError = require('./customErrorRequest')

class NotFoundError extends CustomerError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError

