import fetch from 'node-fetch'
import ytdl from 'ytdl-core'

const getStream = (url) => {
    return ytdl.getInfo(url).then((info) => {
        return {
            title: info.title,
            url: info.formats[0].url,
            length: info.length_seconds,
            vote: 0
        }
    })
}

export default {
  getStream: getStream
}