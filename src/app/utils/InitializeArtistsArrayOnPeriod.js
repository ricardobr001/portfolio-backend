module.exports = artists => {
    return artists.map(artist => {
        return [{ period: 1510884000, artist, scrobbleCount: 0 }]
    })
}
