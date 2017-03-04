import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv'

dotenv.load()

const clientId = process.env.SPOTIFY_CLIENT_ID,
      clientSecret = process.env.SPOTIFY_CLIENT_SECRET

// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
})

const setAccessToken = () => {
  spotifyApi.clientCredentialsGrant().then(function(data) {
    spotifyApi.setAccessToken(data.body.access_token)
  }).catch(function(err) {
    console.error('Something went wrong when retrieving an access token', err)
  })
}

export default {
  getStreams (url) {

  }
}