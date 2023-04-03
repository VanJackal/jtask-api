import express = require("express")
import {Task,ITask,State,validateTask} from "db";
import {logger} from 'logging'
import {Types} from 'mongoose'

const router = express.Router()

//TODO User verification here

router.post('/task',async (req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Creating Task`) // TODO replace with user
    const task:ITask = validateTask(req.body);
    if (!task) {
        logger.debug(`[${"USER PLACEHOLDER"}] - Task Creation Failed, failed to validate task`) // TODO replace with user
        res.sendStatus(400)
        return
    }

    await Task.create(task);
    logger.trace(`[${"USER PLACEHOLDER"}] - Task Created:\n\t${JSON.stringify(task)}`) // TODO replace with user
    res.status(201)
    await res.json(task)
    res.send()
})

router.get('/tasks',async (req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Getting Task-list`) // TODO replace with user

    const tasks = await Task.find()
    await res.json(tasks);
    res.send()
})

/**
 * check that the id in the request is valid
 */
router.all('/tasks/:id', async (req,res,next) => {
    if(!Types.ObjectId.isValid(req.params.id)) {
        logger.trace(`[${"USER PLACEHOLDER"}] - Invalid task id in /tasks/:id`) // TODO replace with user
        res.status(400)
        res.send("Invalid ID")
    }
    const task = await Task.findById(req.params.id);
    if(!task) {
        logger.debug(`[${"USER PLACEHOLDER"}] - Invalid task id in /tasks/:id`) // TODO replace with user
        res.sendStatus(400)
    } else {
        next()
    }
})
router.get('/tasks/:id',async (req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Getting Task[${req.params.id}]`) // TODO replace with user
    await res.json(await Task.findById(req.params.id));
    res.send()
})

router.patch('/tasks/:id',async (req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Updating Task[${req.params.id}]`) // TODO replace with user
    logger.trace(`\tUpdate: ${JSON.stringify(req.body)}`)
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{runValidators:true})
    await res.json(task)
    res.send()
})

router.delete('/tasks/:id',async (req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Deleting Task[${req.params.id}]`) // TODO replace with user
    const task = await Task.findByIdAndDelete(req.params.id)
    await res.json(task)
    res.send()
})

export {
    router
}