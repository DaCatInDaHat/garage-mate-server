const express = require('express')
const Task = require('../models/taskModel.js')
const mongoose = require('mongoose')

const router = express.Router()

router.get('/', async (request, response) => {  
    const tasks = await Task.find({})
    response.status(200).json(tasks)  
})

router.get('/:id', async (request, response) => {
    const { id } = request.params
    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({error: 'no such task'})
    }

    response.status(200).json(task)
  })

router.post('/', async (request, response) => {
  
    if (!request.body.title) {
      return response.status(400).json({
        error: 'fill a title'
      })
    }

    const newTask = {
      title: request.body.title,
      description: request.body.description,
      status: request.body.status
    }

    try{
      const task = await Task.create(newTask)
      response.status(200).json(task)
    } catch (error) {
      response.status(400).json({error: error.message})
    }
})

router.patch('/:id', async (request, response) => {
  const { id } = request.params  

  if(!mongoose.Types.ObjectId.isValid(id)){
    return response.status(400).json({error: 'no such task'})
  }
    
  const task = await Task.findByIdAndUpdate({_id: id}, {...request.body})   

  if (!task) {
    return response.status(400).json({error: 'no such task'})
  }

  response.status(200).json(task)  
})

router.delete('/:id', async (request, response) => {  
  const { id } = request.params

  const task = await Task.findByIdAndDelete({_id: id})

  if(!task) {
    return res.status(400).json({error: 'No such task'})
  }

  response.status(200).json(task)
})

module.exports = router