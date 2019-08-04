const lastService = require('../services/Last')
const MusicService = require('../services/MusicBrainz')
const FanArtService = require('../services/FanArtTV')
const GeniusService = require('../services/Genius')
const Q = require('q')

class LastController {
    async topArtists (req, res) {
        const artists = await lastService.topArtists(3)

        for (const x of artists) {
            if (x.mbid === '') {
                x.mbid = await MusicService.recoverMBID(x.name)
            }
        }

        const pictures = await Q.all([
            FanArtService.recoverImage(artists[0].mbid),
            FanArtService.recoverImage(artists[1].mbid),
            FanArtService.recoverImage(artists[2].mbid)
        ])

        pictures.forEach((x, i) => {
            artists[i].image = x
        })

        res.send(artists)
    }

    async lastSong (req, res) {
        const song = await lastService.lastSong()
        const lyric = await GeniusService.searchUrl(
            song.artist.toLowerCase(),
            song.name.toLowerCase()
        )
        song.lyric = lyric

        res.send(song)
    }
}

module.exports = new LastController()
