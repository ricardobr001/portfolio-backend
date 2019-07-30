const express = require('express')
const handle = require('express-async-handler')
const routes = express.Router()
const controllers = require('./app/controllers')

routes.get(
    '/',
    handle((req, res) => {
        res.json({ ok: 'ok' })
    })
)

routes.get(
    '/lastTopArtists/:length',
    handle(controllers.LastController.topArtists)
)

module.exports = routes
