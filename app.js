import Koa from 'koa'
import Router from 'koa-router'
import Omx from 'node-omxplayer'

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
  ctx.body = ''
  console.log(ctx.request);
})

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000)

const exitHandler = () => {
  if (musicPlayer.running) {
    musicPlayer.quit()
  }

  process.exit(0);
}

//Catch ctrl + c and exiting
process.on('SIGINT', exitHandler)
process.on('exit', exitHandler);