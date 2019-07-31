const axios = require('axios')
const fanArtConfig = require('../config/FanArtTV')

class FanArtTV {
    constructor () {
        this._api = axios.create({ baseURL: fanArtConfig.BASE_URL })
    }

    async recoverImage (mbid) {
        try {
            const res = await this._api.get(
                `/${mbid}&?api_key=${fanArtConfig.API_KEY}&format=json`
            )

            const i = Math.floor(
                Math.random() * res.data.artistbackground.length
            )
            return res.data.artistbackground[i].url
        } catch (err) {
            return 'assets/img/rockbandnotfound.png'
        }
    }
}

module.exports = new FanArtTV()
