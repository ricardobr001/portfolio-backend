const moment = require('moment')

module.exports = artists => {
    return artists.map(artist => {
        return { name: artist, data: [[moment.unix(1510884000).format('DD-MM-YYYY'), 0]] }
    })
}
