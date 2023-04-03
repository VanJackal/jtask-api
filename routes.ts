import express = require("express")
import {Task,ITask,State,validateTask} from "db";
import {logger} from 'logging'

const router = express.Router()


router.post('/task',async (req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Creating Task`) // TODO replace with user
    const task:ITask = validateTask(req.body.json());
    if (!task) {
        logger.debug(`[${"USER PLACEHOLDER"}] - Task Creation Failed, failed to validate task`) // TODO replace with user
        res.sendStatus(400)
        return
    }

    await Task.create(task);
    logger.trace(`[${"USER PLACEHOLDER"}] - Task Created:\n${task}`) // TODO replace with user
    res.sendStatus(201)
})

router.get('/tasks',(req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Getting Task-list`) // TODO replace with user

})

/**
 * check that the id in the request is valid
 */
router.all('/tasks/:id', async (req,res,next) => {
    const task = await Task.findById(req.params.id);
    if(!task) {
        logger.debug(`[${"USER PLACEHOLDER"}] - Invalid task id in /tasks/:id`) // TODO replace with user
        res.sendStatus(400)
    } else {
        next()
    }
})
router.get('/tasks/:id',(req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Getting Task[${req.params.id}]`) // TODO replace with user

})

router.patch('/tasks/:id',(req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Updating Task[${req.params.id}]`) // TODO replace with user

})

router.delete('/tasks/:id',(req,res) => {
    logger.debug(`[${"USER PLACEHOLDER"}] - Deleting Task[${req.params.id}]`) // TODO replace with user

})

export {
    router
}