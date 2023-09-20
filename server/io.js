// Inside each ".js" file above, the module expects this at a bare-minimum
export default function (socket, io) {
  return Object.freeze({
    sendMessage (msg) {
      console.log('kamu ngirim ini loh :', msg)
      return `kamu mengirim ini loh ler der ${msg}`
    }
  })
}
