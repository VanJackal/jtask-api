import {model, Schema, Types} from 'mongoose'
enum State {
    Complete,
    Incomplete,
    Dropped
}
interface ITask {
    title:string,
    description?:string,
    dueDate?:Date,
    state:State,
    tags?:Array<string>,
    alerts?:Array<Date>,
    parent?:Types.ObjectId
}

const TaskSchema = new Schema<ITask>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    dueDate:{
        type:Date
    },
    state:{
        type:Number,
        required:true
    },
    tags:{
        type:[String]
    },
    alerts:{
        type:[Date]
    },
    parent:{
        type:Schema.Types.ObjectId
    }
})

const Task = model<ITask>('task',TaskSchema)

/**
 * check an input task object and return null if it is invalid, return a valid strict ITask object (no added fields)
 * @param task ITask input
 */
function validateTask(task):ITask {
    if (typeof task.title === "string"
        && typeof task.state === "number"
        && Object.values(State).includes(task.state) // check task.state is a valid state
        && (typeof task.description === "undefined" || typeof task.description === "string")
        && (typeof task.dueDate === "undefined" || task.dueDate instanceof Date)
        && (typeof task.tags === "undefined" || task.tags instanceof Array
            && task.tags.every( (tag) => {
                return typeof tag === "string"
            }))
        && (typeof task.alerts === "undefined" || task.alerts instanceof Array
            && task.alerts.every((alert) => {
                return alert instanceof Date
            }))
        && (typeof task.parent == "undefined" || task.parent instanceof Types.ObjectId)
    ) {
        return { // return object without any extra fields
            alerts: task.alerts,
            description: task.description,
            dueDate: task.dueDate,
            parent: task.parent,
            state: task.state,
            tags: task.tags,
            title:task.title
        }
    } else {
        return null;
    }
}

export {
    Task,
    ITask,
    State,
    validateTask
}