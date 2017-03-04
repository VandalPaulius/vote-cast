import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import Omx from 'node-omxplayer'
import spotifyApi from './spotifyApi'


const app = new Koa()
const router = new Router({
  prefix: '/api'
})

const musicPlayer = Omx()

musicPlayer.on('close', () => {
  console.log("finished Q.Q")
});

let streams = [];
let isPaused = false;

router.get('/streams', (ctx, next) => {
  ctx.body = streams
})

router.post('/streams', (ctx, next) => {
  const url = ctx.request.body.url

  streams.push(url)

  ctx.status = 201
})

router.post('/play', (ctx, next) => {
  if (isPaused) {
    musicPlayer.play()
  } else {
    musicPlayer.newSource(streams[0], 'alsa', false, 0)
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