require('dotenv').config()
const express = require('express')
const app = express()



// connect to db 
const connectDB = require('./db/connect')


app.get('/', (req, res) => {
    res.send('Hello World!')
})


// routers
const userEntryRouter = require('./routes/userExpense')
const userLogRouter = require('./routes/userLog')



app.use(express.json())

app.use('/api/v1/expense',userEntryRouter)
app.use('/api/v1/user',userLogRouter)

const port = process.env.PORT || 3000

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



