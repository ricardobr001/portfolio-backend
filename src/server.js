const express = require('express')
const routes = require('./routes')
const Youch = require('youch')

class App {
    constructor () {
        this.express = new express()

        this.routes()
        this.exception()
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
