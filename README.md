# Spotify WEB API Demo

https://jons-playlist-maker.herokuapp.com

This project uses Spotify's WEB API to generate a playlist based off a search term that includes either a song title or artist name.

Authorization is done via client credentials oAuth2 flow to authenticate against the Spotify Accounts. For more information, read https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow

Once authorized, we can then hit Spotify's WEB API to find the first song result based off the search query, and finally generate related tracks based off spotify's recommendation algorithm.

This app has a route that can also serve JSON, example: https://jons-playlist-maker.herokuapp.com/song?name=yellow%20coldplay

- Note spaces between the search term are separated by %20 or +

* Please feel free to check it out: https://jons-playlist-maker.herokuapp.com
