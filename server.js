require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const tasksRoutes = require('./routes/tasksRoute')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/tasks', tasksRoutes)

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log('connected to database')
    app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
})