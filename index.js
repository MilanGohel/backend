const connectToMongo = require('./db/conn');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 6969;

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/studentRoutes/auth'))
app.use('/api/auth',require('./routes/adminRoutes/auth'))
app.use('/api/auth',require('./routes/adminRoutes/quiz'))
app.use('/api/auth',require('./routes/studentRoutes/quiz'))
// app.use('/api/quiz', require('./routes/quiz'))


app.listen(port, () => {
  console.log(`MUKH backend listening at http://localhost:${port}`)
})