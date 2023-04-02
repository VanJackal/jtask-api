import {logger} from 'logging'
import * as mongoose from 'mongoose'

function init():void {
    mongoose.connect(process.env.DB).then((err) => {
        if (err) {
            logger.fatal("DB Failed to connect")
            logger.fatal(err)
        } else {
            logger.info(`DB Connected @ ${process.env.DB}`)
        }
    })
}
init()

export * from './task'