import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import Omx from 'node-omxplayer'
import spotifyApi from './spotifyApi'
import youtubeApi from './youtubeApi'


const app = new Koa()
const router = new Router({
  prefix: '/api'
})

const musicPlayer = Omx()

musicPlayer.on('close', () => {
  streams.pop()

  console.log('Song finished playing')
});

let streams = [];
let isPaused = false;

router.get('/streams', (ctx, next) => {
  ctx.body = streams.sort((s1, s2) => s2.vote - s1.vote)
})

router.post('/streams', (ctx, next) => {
  const url = unescape(ctx.request.body.url)

  if(url.indexOf('youtube') > -1) {
    youtubeApi.getStream(url).then(data => {
      streams.push(Object.assign({}, {id: streams.length}, data))
    })
  } else if (url.indexOf('spotify') > -1) {
    spotifyApi.getStreams(url).then(data => {
      for(let i = 0; i < data.length; i++) {
        streams.push(Object.assign({}, {id: streams.length}, data[i]))
      }
    })
  } else {
    streams.push({
      id: streams.length,
      url: url,
      vote: 0
    })
  }

  ctx.status = 201
})

router.post('/streams/:id/vote', (ctx, next) => {
  const vote = ~~ctx.request.body.vote
  const id = ~~ctx.params.id

  streams = streams.map((stream) => {
    if (stream.id == id) {
      stream.vote += vote
    }

    return stream
  })

  ctx.status = 200
})

router.post('/play', (ctx, next) => {
  if (isPaused) {
    musicPlayer.play()
  } else {
    musicPlayer.newSource(streams[0].url)
  }

  ctx.status = 200
})

router.post('/pause', (ctx, next) => {
  isPaused = true;

  musicPlayer.pause()

  ctx.status = 200
})

router.post('/stop', (ctx, next) => {
  isPaused = false;

  musicPlayer.pause()

  ctx.status = 200
})

router.post('/volume-up', (ctx, next) => {
  musicPlayer.volUp()

  ctx.status = 200
})

router.post('/volume-down', (ctx, next) => {
  musicPlayer.volDown()

  ctx.status = 200
})

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000)

const exitHandler = () => {
  if (musicPlayer.running) {
    musicPlayer.quit()
  }

  process.exit(0)
}

//Catch ctrl + c and exiting
process.on('SIGINT', exitHandler)
process.on('exit', exitHandler)