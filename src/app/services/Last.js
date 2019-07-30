const axios = require('axios')
const lastConfig = require('../config/LastFM')
const shuffle = require('../utils/Shuffle')

class LastFM {
    constructor () {
        this._api = axios.create({ baseURL: lastConfig.BASE_URL })
    }

    async topArtists (len) {
        const res = await this._api.get(
            `/?method=user.gettopartists&` +
                `user=${lastConfig.USER}&` +
                `api_key=${lastConfig.API_KEY}&` +
                `limit=${lastConfig.NUMBER_ARTISTS}&` +
                `format=json`
        )

        const array = res.data.topartists.artist.reduce((acc, curr) => {
            const { mbid, playcount, name } = curr

            return [...acc, { mbid, playcount, name, image: '' }]
        }, [])

        shuffle(array)
        return array.slice(0, len)
    }
}

module.exports = new LastFM()
