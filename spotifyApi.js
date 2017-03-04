const clientId = process.env.SPOTIFY_CLIENT_ID,
      clientSecret = process.env.3d9a7ac440ad4c8db08c3792eca8403f;

// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

export default {

}