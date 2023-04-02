import express = require('express')
import {logger} from 'logging'


const app = express()

const PORT = process.env.PORT || 5000

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Credentials","true")
    next();
})

app.use(express.json())

app.use('*', (req, res, next) => { // log<trace> all requests
    logger.trace(`request: ${req.method} ${req.originalUrl}`)
    next()
})

app.use((err,req,res,next) => { // catch & log errors
    logger.error(err)
    res.sendStatus(500)
})

app.listen(PORT, () => { // start server
    logger.info(`Server running on port ${PORT}`)
})