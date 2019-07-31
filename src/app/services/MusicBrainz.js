const axios = require('axios')
const musicConfig = require('../config/MusicBrainz')

class MusicBrainz {
    constructor () {
        this._api = axios.create({ baseURL: musicConfig.BASE_URL })
    }

    async recoverMBID (artist) {
        const res = await this._api.get(`?query=artist:${artist}&fmt=json`)

        return res.data.artists[0].id
    }
}

module.exports = new MusicBrainz()
