require('dotenv').config()

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const Youch = require('youch')
const validate = require('express-validation')

class App {
    constructor () {
        this.express = express()

        this.middlewares()
        this.routes()
        this.exception()
    }

    middlewares () {
        this.express.use(cors())
    }

    routes () {
        this.express.use(routes)
    }

    exception () {
        this.express.use(async (err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err)
            }

            if (process.env.NODE_ENV !== 'production') {
                const youch = new Youch(err, req)

                return res.send(await youch.toHTML())
            }

            return res.status(err.status || 500).json({
                error: 'Internal Server Error'
            })
        })
    }
}

module.exports = new App().express
