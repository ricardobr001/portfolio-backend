const lastService = require('../services/Last')
const MusicService = require('../services/MusicBrainz')
const FanArtService = require('../services/FanArtTV')
const GeniusService = require('../services/Genius')

class LastController {
    async topArtists(req, res) {
        const artists = await lastService.topArtists(3)

        for (const x of artists) {
            if (x.mbid === '') {
                x.mbid = await MusicService.recoverMBID(x.name)
            }
        }

        const pictures = await Promise.all([
            FanArtService.recoverImage(artists[0].mbid),
            FanArtService.recoverImage(artists[1].mbid),
            FanArtService.recoverImage(artists[2].mbid)
        ])

        pictures.forEach((x, i) => {
            artists[i].image = x
        })

        res.send(artists)
    }

    async lastSongWithUrl(req, res) {
        const song = await lastService.lastSong()
        const url = await GeniusService.getLyricUrl(song.artist.toLowerCase(), song.name.toLowerCase())
        song.url = url

        res.send(song)
    }

    async lastGraphic(req, res) {
        const { len } = req.params

        const artists = await lastService.myInfo(len)
        const result = await lastService.artistsInfoBetweenPeriods(artists)

        res.send(result)
    }
}

module.exports = new LastController()
