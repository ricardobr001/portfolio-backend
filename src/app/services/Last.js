// const apisauce = require('apisauce')
const axios = require('axios')
const lastConfig = require('../config/LastFM')

class LastFM {
    constructor () {
        this._api = axios.create({ baseURL: lastConfig.baseURL })
    }

    async topArtists () {
        const res = await this._api.get(
            `/?method=user.gettopartists&` +
                `user=${lastConfig.user}&` +
                `api_key=${lastConfig.API_KEY}&` +
                `limit=${lastConfig.numberArtists}&` +
                `format=json`
        )

        const array = res.data.topartists.artist.reduce((acc, curr) => {
            const { mbid, playcount, name } = curr

            return [...acc, { mbid, playcount, name, image: '' }]
        }, [])

        return array
    }
}

module.exports = new LastFM()
