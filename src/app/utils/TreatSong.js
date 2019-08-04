module.exports = (arr, song, artist) => {
    song = song.replace(new RegExp('’', 'g'), "'")

    const founded = arr.filter(x => {
        if (x.result.primary_artist.name.toLowerCase() === artist) {
            const lowerCase = x.result.title.toLowerCase()
            const singleQuoteSong = lowerCase.replace(new RegExp('’', 'g'), "'")

            if (singleQuoteSong === song) {
                return true
            }
        }
        return false
    })

    return founded
}
