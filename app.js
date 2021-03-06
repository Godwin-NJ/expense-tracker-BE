require('dotenv').config()
const express = require('express')
require('express-async-errors');


//  extra security features 
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

// creating express server 
const app = express()
// security middleware/ features
app.set('trust proxy', 1);
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100  // limit each IP to 100 requests per windowMs
  }))

// connect to db 
const connectDB = require('./db/connect')


app.get('/', (req, res) => {
    res.send('Hello World!')
})


// middleware 
const authentication = require('./middleware/auth')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const notFoundMiddleware = require('./middleware/notFound')


// routers
const userEntryRouter = require('./routes/userExpense')
const userLogRouter = require('./routes/userLog')


// routes
app.use('/api/v1/user',userLogRouter)
app.use('/api/v1/expense',authentication,userEntryRouter)
// app.use('/api/v1/expense',userEntryRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000



const start = async() => {
    try {
        await connectDB(process.env.URI)
        app.listen(port ,  console.log(`App listening on port ${port}`))
    } catch (error) {
        console.log(`error connecting to ${port} ${error}...`)
        // throw new Error('Error connecting to DB')
    }
}

start()



