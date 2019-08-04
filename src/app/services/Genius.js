const axios = require('axios')
const geniusConfig = require('../config/Genius')
const Lyricist = require('lyricist')

class Genius {
    constructor () {
        this._api = axios.create({ baseURL: geniusConfig.BASE_URL })
        this._lyricist = new Lyricist(geniusConfig.ACCESS_TOKEN)
    }

    async searchUrl (artist, song) {
        const auxArtist = encodeURIComponent(artist)
        const auxSong = encodeURIComponent(song)
        const res = await this._api.get(
            `/search?q=${auxArtist}& ${auxSong}&` +
                `access_token=${geniusConfig.ACCESS_TOKEN}`
        )

        const founded = res.data.response.hits.filter(
            x =>
                x.result.primary_artist.name.toLowerCase() === artist &&
                x.result.title.toLowerCase() === song
        )

        if (founded.length > 0) {
            const res = await this._lyricist.song(founded[0].result.id, {
                fetchLyrics: true
            })

            return res.lyrics
        }

        return '404 NOT FOUND\n¯\\_(ツ)_/¯'
    }
}

module.exports = new Genius()
