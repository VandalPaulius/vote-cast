import Koa from 'koa'
import Router from 'koa-router'
import Omx from 'node-omxplayer'

const app = new Koa()
const router = new Router({
  prefix: '/api'
})

let musicPlayer = Omx()

router.get('/', (ctx, next) => {
  ctx.body = {
    streams: []
  }
})

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000)

const exitHandler = () => {
  if (musicPlayer.running) {
    musicPlayer.quit()
  }
}

//Catch ctrl + c and exiting
process.on('SIGINT', exitHandler)
process.on('exit', exitHandler);