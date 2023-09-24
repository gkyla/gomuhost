// eslint-disable no-unused-vars

// Inside each ".js" file above, the module expects this at a bare-minimum
import axios from 'axios'
import { endPointList } from '../utils/endPointParser'

export default function Svc (socket, io) {
  /* not really working in production */
  const { youtubeVideoDetail } = endPointList

  return Object.freeze({
    async sendMessage (msg) {
      console.log('kamu ngirim ini loh :', msg)
      const { data } = await axios.get(youtubeVideoDetail(process.env.YOUTUBE_API_KEY, 'e0pAtUCP_NU'))
      return {
        message: 'kamu mengirim ini loh ler der ',
        payload: { ...data.items[0] }
      }
    }
  })
}
