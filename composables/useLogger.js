function parseYTPlayerState (playerState) {
  let videoState = ''

  // YT.PlayerState
  // BUFFERING : 3
  // CUED : 5
  // ENDED : 0
  // PAUSED : 2
  // PLAYING : 1
  // UNSTARTED : -1

  switch (playerState) {
    case 1:
      videoState = 'Now Playing ▶️ '
      break
    case 2:
      videoState = 'Video Paused ⏸️ '
      break
    case 0:
      videoState = 'Video Ended 🔚'
      break
  }

  return videoState
}

export function useLogger () {
  function createLogState (loggerContainer, payload) {
    const p = document.createElement('p')
    const parsedVideoState = parseYTPlayerState(payload.playerState)
    p.innerText = `${parsedVideoState} ${payload.title}, 🎞️ Channel  : ${payload.author}`
    loggerContainer.appendChild(p)

    return p
  }

  function createLogCommandRunner (loggerContainer, { command, message }) {
    const p = document.createElement('p')
    const user = 'Gitkyla' /* will use real user later */
    p.innerText = `User ${user} run command ${command}, ${message}`
    loggerContainer.appendChild(p)
  }

  return { createLogState, createLogCommandRunner }
}
