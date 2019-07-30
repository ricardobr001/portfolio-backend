const lastService = require('../services/Last')

class LastController {
    async topArtists (req, res) {
        const artists = await lastService.topArtists()

        res.send(artists)
    }
}

module.exports = new LastController()
