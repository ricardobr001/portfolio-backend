const axios = require('axios')
const geniusConfig = require('../config/Genius')
const treatSong = require('../utils/TreatSong')

class Genius {
    constructor() {
        this._api = axios.create({
            baseURL: geniusConfig.BASE_URL,
            headers: { Authorization: `Bearer ${geniusConfig.ACCESS_TOKEN}` }
        })
    }

    async getLyricUrl(artist, song) {
        const auxArtist = encodeURIComponent(artist)
        const auxSong = encodeURIComponent(song)
        const resSearch = await this._api.get(`/search?q=${auxSong} ${auxArtist}`)

        const founded = treatSong(resSearch.data.response.hits, song, artist)

        if (founded.length > 0) {
            const resGeniusUrl = await this._api.get(`/songs/${founded[0].result.id}`)

            return resGeniusUrl.data.response.song.url
        }

        return '404 NOT FOUND\n¯\\_(ツ)_/¯'
    }
}

module.exports = new Genius()
