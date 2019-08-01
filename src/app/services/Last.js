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

            return [...acc, { mbid, playcount: +playcount, name, image: '' }]
        }, [])

        shuffle(array)
        return array.slice(0, len)
    }

    async lastSong () {
        const res = await this._api.get(
            `/?method=user.getrecenttracks&` +
                `user=${lastConfig.USER}&` +
                `api_key=${lastConfig.API_KEY}&` +
                `format=json`
        )

        return {
            name: res.data.recenttracks.track[0].name,
            image: res.data.recenttracks.track[0].image[3]['#text'],
            artist: res.data.recenttracks.track[0].artist['#text'],
            listening: !!res.data.recenttracks.track[0]['@attr'],
            totalScrobble: +res.data.recenttracks['@attr'].total
        }
    }
}

module.exports = new LastFM()
