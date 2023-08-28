<script setup>
const iframeVideo = ref(null)
const currentStatus = ref(null)
const player = ref('')
const userCommand = ref('')
const logs = ref([])

onMounted(() => {
  console.log(iframeVideo.value)

  /* TODO: cari tau jalanin function ketika script sudah selesai load */
  function onYouTubeIframeAPIReady () {
    player.value = new YT.Player(iframeVideo.value.id, {
      height: '390',
      width: '640',
      videoId: 'hbhV2Ij-Lbg',
      playerVars: {
        playsinline: 1
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    })
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady (event) {
    // console.log('event', event.target)
    // event.target.playVideo()
  }

  function onPlayerStateChange (event) {
    // eslint-disable-next-line eqeqeq
    console.log('onPlayerStateChange', event)
    if (event.data === 3 || event.data === 5 || event.data === -1) {
      return /* Only continue if PLAYING (1), PAUSED (2) & ENDED (0) */
    }

    const videoData = event.target.getVideoData()
    const createObjectData = {
      playerState: event.data,
      video_id: videoData.video_id,
      video_quality: videoData.video_quality,
      title: videoData.title,
      author: videoData.author
    }

    createLogState(createObjectData)
    logs.value.push({ ...createObjectData })

    console.log('State Changed', logs.value)
  }

  // function stopVideo () {
  //   player.value.stopVideo()
  // }

  onYouTubeIframeAPIReady()
})

function createLogState (payload) {
  const p = document.createElement('p')
  const parsedVideoState = parseYTPlayerState(payload.playerState)
  p.innerText = `${parsedVideoState} ${payload.title}, Channel : ${payload.author}`
  currentStatus.value.appendChild(p)

  return p
}

function createLogCommandRunner (command) {
  const p = document.createElement('p')
  const user = 'Gitkyla' /* will use real user later */
  p.innerText = `User ${user} run ${command}`
  currentStatus.value.appendChild(p)
}

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

function runCommand () {
  const [command, id] = userCommand.value.split(' ')

  switch (command) {
    case '!play':
      player.value.loadVideoById(id)
      /* potentialy get the video data again to show when playing  */
      createLogCommandRunner(command)
      break
  }
}

// TODO: Setting up command (!play, !skip, !pause, !stop)
</script>

<template>
  <div class="flex justify-center items-center flex-col">
    <div id="iframe-video" ref="iframeVideo"></div>
    <input type="text" v-model="userCommand" class="border-4 mt-20 w-full" />
    <button @click="runCommand">send command</button>

    <div id="currentStatus" class="mt-10 px-2" ref="currentStatus">
      <p class="text-2xl">test</p>
    </div>
  </div>
</template>
