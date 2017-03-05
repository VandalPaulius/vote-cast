import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv'

dotenv.load()

const clientId = process.env.SPOTIFY_CLIENT_ID,
      clientSecret = process.env.SPOTIFY_CLIENT_SECRET

// Create the api object with the credentials
const api = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
})

const setAccessToken = () => {
  return api.clientCredentialsGrant()
    .then(data => api.setAccessToken(data.body.access_token))
    .catch(err => console.error('Something went wrong when retrieving an access token', err))
}

const spotifyApi = {
  getStreams (url) {
    return setAccessToken().then(() => {
      if (url.indexOf('playlist') > -1) {
        let args = []

        if (url.indexOf('open.spotify.com') > -1) {
          let urlParts = url.split('/')

          args.push(urlParts[4])
          args.push(urlParts[6])
        } else {
          let urlParts = url.split(':')

          args.push(urlParts[2])
          args.push(urlParts[4])
        }

        return api.getPlaylistTracks.apply(api, args).then(data => {
          return data.body.items.map(item => spotifyApi.transformTrack(item.track))
        })
      } else {
        let trackIds = []

        if (url.indexOf('open.spotify.com') > -1) {
          trackIds.push(url.split('/')[4])
        } else {
          trackIds.push(url.split(':')[2])
        }

        return api.getTracks(trackIds).then(data => data.body.tracks.map(spotifyApi.transformTrack))
      }
    })
  },

  transformTrack (track) {
    return {
      url: track.preview_url,
      title: track.name,
      length: track.duration_ms / 60,
      vote: 0,
    }
  }
}

export default spotifyApi