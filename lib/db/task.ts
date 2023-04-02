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

export {
    Task,
    ITask
}