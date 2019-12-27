const axios = require('axios')
const lastConfig = require('../config/LastFM')
const shuffle = require('../utils/Shuffle')
const arrayWeeklyArtistsEndpoints = require('../utils/ArrayWeeklyArtistsEndpoints')
const initializeArtistsArrayOnPeriod = require('../utils/InitializeArtistsArrayOnPeriod')

class LastFM {
    constructor() {
        this._api = axios.create({ baseURL: lastConfig.BASE_URL })
    }

    async topArtists(len) {
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

    async lastSong() {
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

    async myInfo(len) {
        const res = await this._api.get(
            `/?method=user.gettopartists&` +
                `user=${lastConfig.USER}&` +
                `api_key=${lastConfig.API_KEY}&` +
                `limit=${len}&` +
                `format=json`
        )

        return res.data.topartists.artist.reduce((acc, curr) => {
            const { name } = curr

            return [...acc, name]
        }, [])
    }

    async artistsInfoBetweenPeriods(artists) {
        const endpoints = arrayWeeklyArtistsEndpoints()

        const res = await Promise.all(
            endpoints.map(async endpoint => {
                const result = await this._api.get(endpoint)

                return result.data
            })
        )

        const artistsInfoOnPeriods = initializeArtistsArrayOnPeriod(artists)
        const periods = [1510884000]

        res.map(artistOnPeriod => {
            artists.map((artist, index) => {
                const founded = artistOnPeriod.weeklyartistchart.artist.filter(obj => obj.name === artist)
                const len = artistsInfoOnPeriods[index][0].data.length - 1

                if (founded.length) {
                    artistsInfoOnPeriods[index][0].data.push(
                        artistsInfoOnPeriods[index][0].data[len] + parseInt(founded[0].playcount, 10)
                    )
                } else {
                    artistsInfoOnPeriods[index][0].data.push(artistsInfoOnPeriods[index][0].data[len])
                }
            })

            const period = parseInt(artistOnPeriod.weeklyartistchart['@attr'].to, 10)
            periods.push(period)
        })

        return { periods, series: artistsInfoOnPeriods }
    }
}

module.exports = new LastFM()
