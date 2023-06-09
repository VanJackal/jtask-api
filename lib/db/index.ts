import {logger} from 'logging'
import * as mongoose from 'mongoose'

function init():void {
    try {
        mongoose.connect(process.env.DB).then()
    } catch (e) {
        logger.fatal("DB Failed to connect")
        logger.fatal(e)
    }
    logger.info(`DB Connected @ ${process.env.DB}`)
}
init()

export * from './task'