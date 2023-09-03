<script setup>
const loggerContainer = ref(null)
const { createLogCommandRunner, createLogState } = useLogger()
const iframeVideo = ref(null)
const player = ref('')
const userCommand = ref('')
const logs = ref([])
const userName = ref('Gitkyla')

onMounted(() => {
  function onYouTubeIframeAPIReady () {
    player.value = new YT.Player(iframeVideo.value.id, {
      height: '390',
      width: '640',
      videoId: '',
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

    createLogState(loggerContainer.value, createObjectData)
    logs.value.push({ ...createObjectData })

    console.log('State Changed', logs.value)
  }

  onYouTubeIframeAPIReady()
})

function runCommand () {
  const [command, userOptions] = userCommand.value.split(' ')
  let youtubeId = ''
  let volume = null
  let userOptionsDecider = null
  let selectedCommand = ''
  let message = ''

  if (userOptions) {
    if (userOptions.includes('youtube.com')) {
      userOptionsDecider = new URL(userOptions).searchParams.get('v')
      youtubeId = userOptionsDecider
    }

    if (!isNaN(parseInt(userOptions))) {
      userOptionsDecider = userOptions
      volume = userOptionsDecider
    }
  }

  switch (command) {
    case '!play': {
      const videoData = player.value.getVideoData()

      if (!youtubeId) {
        if (videoData.video_id) {
          /* Potentially bakal diganti msg command nya, diganti jadi nambahin queue */
          selectedCommand = command
          message =
            'Cannot proceed because there is still video in the queue; instead, use command !resume to play the current video.'
          break
        } else {
          selectedCommand = command
          message =
            'Cannot proceed because there is no link given by the user to the chat box.'
          break
        }
      } else {
        player.value.loadVideoById(youtubeId)
        selectedCommand = command
        break
      }
    }
    case '!pause': {
      player.value.pauseVideo()
      selectedCommand = command
      break
    }
    case '!stop': {
      player.value.stopVideo()
      selectedCommand = command
      break
    }
    case '!resume': {
      player.value.playVideo()
      selectedCommand = command
      break
    }
    case '!mute': {
      player.value.mute()
      selectedCommand = command
      break
    }
    case '!unmute': {
      player.value.unMute()
      selectedCommand = command
      break
    }
    case '!setvolume': {
      const videoData = player.value.getVideoData()

      if (!volume) {
        selectedCommand = command
        message =
          '🔊 Cannot proceed because no volume was input by the user in the chat box.'
        break
      } else {
        if (!videoData.video_id) {
          selectedCommand = command
          message = '🔊 Cannot be proceeded because no video is currently playing.'
        } else {
          if (parseInt(volume) > 100) {
            selectedCommand = command
            message = `🔊 Volume can't be set above 100%; the system now forces the video to be set to 100% instead of ${volume}`
          } else {
            selectedCommand = command
            message = `🔊 Volume has now changed to ${volume}%`
          }
          player.value.setVolume(volume)
        }
      }
      break
    }
    default:
      console.error(command)
  }

  userCommand.value = ''
  createLogCommandRunner(loggerContainer.value, {
    command: selectedCommand,
    message
  })
}
</script>

<template>
  <div class="flex justify-center items-center flex-col">
    <div id="iframe-video" ref="iframeVideo"></div>
    <input type="text" v-model="userCommand" class="border-4 mt-20 w-full" />
    <input type="text" v-model="userName" class="border-4 mt-20 w-full" />
    <button @click="runCommand">send command</button>

    <div id="currentStatus" class="mt-10 px-2" ref="loggerContainer">
      <p class="text-2xl">test</p>
    </div>
  </div>
</template>
