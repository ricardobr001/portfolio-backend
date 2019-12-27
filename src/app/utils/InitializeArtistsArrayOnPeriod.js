module.exports = artists => {
    return artists.map(artist => {
        return [{ name: artist, data: [0] }]
    })
}
