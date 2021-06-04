const constants = require('../global/constants')

module.exports = (artists) => {
    const timeInMiliseconds = constants.INITIAL_UNIX_TIMESTAMP_GRAPHIC_INFO_IN_SECONDS * 1000
    const bandCounterInitial = 0

    return artists.map((artist) => {
        return { name: artist, data: [[timeInMiliseconds, bandCounterInitial]] }
    })
}
