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

routes.get('/lastSong', handle(controllers.LastController.lastSong))

module.exports = routes
