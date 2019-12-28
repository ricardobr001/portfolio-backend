// const moment = require('moment')

module.exports = artists => {
    return artists.map(artist => {
        return { name: artist, data: [[1510884000000, 0]] }
    })
}
