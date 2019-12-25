const lastConfig = require('../config/LastFM')
const moment = require('moment')

module.exports = () => {
    const endpoint =
        `/?method=user.getweeklyartistchart&` +
        `user=${lastConfig.USER}&` +
        `api_key=${lastConfig.API_KEY}&` +
        `format=json&`
    const interval = 604800
    const array = []
    const actualMoment = moment().unix()

    let initialTime = 1510884000
    let endTime = initialTime + interval

    while (endTime < actualMoment) {
        array.push(`${endpoint}&from=${initialTime}&to=${endTime}`)

        initialTime = endTime
        endTime = initialTime + interval
    }

    return array
}
