const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDatabase = require('./configs/db.config')

dotenv.config();

connectDatabase();

const authRouter = require('./auth/auth.routes')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING')
})

app.use('/auth', authRouter)

const server = app.listen(process.env.PORT, () => {
  console.log(`Express running on ${server.address().port}`)
})
