const axios = require('axios')
const moment = require('moment')

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
        let maxScrobble = 0

        res.map(artistOnPeriod => {
            artists.map((artist, index) => {
                const founded = artistOnPeriod.weeklyartistchart.artist.filter(obj => obj.name === artist)
                const len = artistsInfoOnPeriods[index].data.length - 1
                const timestamp = parseInt(artistOnPeriod.weeklyartistchart['@attr'].to, 10) * 1000

                if (founded.length) {
                    const newData = [
                        timestamp,
                        artistsInfoOnPeriods[index].data[len][1] + parseInt(founded[0].playcount, 10)
                    ]

                    artistsInfoOnPeriods[index].data.push(newData)

                    if (artistsInfoOnPeriods[index].data[len][1] > maxScrobble) {
                        maxScrobble = artistsInfoOnPeriods[index].data[len][1]
                    }
                } else {
                    const newData = [timestamp, artistsInfoOnPeriods[index].data[len][1]]

                    artistsInfoOnPeriods[index].data.push(newData)
                }
            })
        })

        return { maxScrobble, series: artistsInfoOnPeriods }
    }
}

module.exports = new LastFM()
