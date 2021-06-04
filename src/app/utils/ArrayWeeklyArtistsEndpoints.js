const constants = require('../global/constants')
const lastConfig = require('../config/LastFM')
const dayjs = require('dayjs')

module.exports = () => {
    const endpoint =
        `/?method=user.getweeklyartistchart&` +
        `user=${lastConfig.USER}&` +
        `api_key=${lastConfig.API_KEY}&` +
        `format=json&`
    const interval = constants.INTERVAL_IN_SECONDS_FOR_GRAPHIC_INFO
    const array = []
    const actualMoment = dayjs().unix()

    let initialTime = constants.INITIAL_UNIX_TIMESTAMP_GRAPHIC_INFO_IN_SECONDS
    let endTime = initialTime + interval

    while (endTime < actualMoment) {
        array.push(`${endpoint}&from=${initialTime}&to=${endTime}`)

        initialTime = endTime
        endTime = initialTime + interval
    }

    return array
}
