# Backend for my portfolio

This is going to be the backend for my [portfolio](https://ricardobr001.github.io/).
Deployed in heroku with https://ricardobr001-backend.herokuapp.com.

# Endpoints

- [GET] **/lastSong**
### Response example
```JSON
{
    "name": "Solway Firth",
    "image": "https://lastfm-img2.akamaized.net/i/u/300x300/b76cca704e783fef98693f5c553ec776.jpg",
    "artist": "Slipknot",
    "listening": true,
    "totalScrobble": 42152,
    "lyric": "404 NOT FOUND\n¯\\_(ツ)_/¯"
}
```

- [GET] **/lastTopArtists**
### Response example

At the moment returning an array with 3 artists
```JSON
[
    {
        "mbid": "1f5ff245-2837-4d4a-a609-e93e544478c3",
        "playcount": 1446,
        "name": "Trivium",
        "image": "https://assets.fanart.tv/fanart/music/1f5ff245-2837-4d4a-a609-e93e544478c3/artistbackground/trivium-5bc3cf94d8ff9.jpg"
    },
    {
        "mbid": "8bfac288-ccc5-448d-9573-c33ea2aa5c30",
        "playcount": 695,
        "name": "Red Hot Chili Peppers",
        "image": "https://assets.fanart.tv/fanart/music/8bfac288-ccc5-448d-9573-c33ea2aa5c30/artistbackground/red-hot-chili-peppers-4f82dd2ec115f.jpg"
    },
    {
        "mbid": "fbcd7b29-455f-49e6-9c4f-8249d20a055e",
        "playcount": 730,
        "name": "Seether",
        "image": "https://assets.fanart.tv/fanart/music/fbcd7b29-455f-49e6-9c4f-8249d20a055e/artistbackground/seether-4dd46e4655414.jpg"
    }
]
```

- [GET] **/graphicInfo/:numberOfArtists**
### Response example

Example for 2 artists with only 2 periods
```JS
{
  "maxScrobble": 3619,
  "series": [
        {
            "name": "Slipknot",
            "data": [
                [
                    1510884000000, // unixTimestamp multiplied by 1000
                    0 // counter of the band on that moment
                ],
                [
                    1511488800000,
                    11
                ]
            ]
        }
        {
            "name": "Linkin Park",
            "data": [
                [
                    1510884000000,
                    0
                ],
                [
                    1511488800000,
                    20
                ]
            ],
        }
    ]
}
```
