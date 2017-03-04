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
let streams = [];

router.get('/', (ctx, next) => {
  ctx.body = streams
})

router.post('/', (ctx, next) => {
  const url = ctx.request.body.url

  ctx.status = 201
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
