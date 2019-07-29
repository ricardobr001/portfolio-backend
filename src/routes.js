const express = require('express')
const handle = require('express-async-handler')
const routes = express.Router()

routes.get(
    '/',
    handle((req, res) => {
        res.json({ ok: 'ok' })
    })
)

module.exports = routes
