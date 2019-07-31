const lastService = require('../services/Last')
const MusicService = require('../services/MusicBrainz')

class LastController {
    async topArtists (req, res) {
        const artists = await lastService.topArtists(req.params.length)

        for (const x of artists) {
            if (x.mbid === '') {
                x.mbid = await MusicService.recoverMBID(x.name)
            }
        }

        res.send(artists)
    }
}

module.exports = new LastController()
