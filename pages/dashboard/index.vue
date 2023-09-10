<script setup>
const loggerContainer = ref(null)
const { createLogCommandRunner, createLogState } = useLogger()
const { getVideoDetail } = useFetchYoutubeData()
const iframeVideo = ref(null)
const player = ref('')
const userCommand = ref('')
const logs = ref([])
const userName = ref('Gitkyla')
const currentPlayingVideo = ref(null)
const queueListVideo = ref([])

onMounted(() => {
  function onYouTubeIframeAPIReady () {
    player.value = new YT.Player(iframeVideo.value.id, {
      height: '390',
      width: '640',
      videoId: 'zf2k9_Nnm7w',
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

  }

  async function onPlayerStateChange (event) {
    // eslint-disable-next-line eqeqeq
    console.log('onPlayerStateChange', event)
    if (event.data === 3 || event.data === 5) {
      return
      /* Only continue if PLAYING (1), PAUSED (2) & ENDED (0)
          UNSTARTED (-1)
      */
    }

    const videoData = event.target.getVideoData()
    const createObjectVideoData = {
      playerState: event.data,
      video_id: videoData.video_id,
      video_quality: videoData.video_quality,
      title: videoData.title,
      author: videoData.author
    } /* masih diperluin buat log state */

    const {
      PLAYING: VID_PLAYING,
      ENDED: VID_ENDED
    } = YT.PlayerState

    if (event.data === VID_PLAYING) {
      const isAlreadyInTheQueue = queueListVideo.value.find((vid) => {
        return vid.id === videoData.video_id
      })

      if (!isAlreadyInTheQueue) {
        const videoDetailData = await getVideoDetail(videoData.video_id)
        console.log(videoDetailData)
        currentPlayingVideo.value = videoDetailData
        queueListVideo.value.push(currentPlayingVideo.value)
      }
    }

    if (event.data === VID_ENDED) {
      currentPlayingVideo.value = null

      if (queueListVideo.value.length > 0) {
        const index = queueListVideo.value.findIndex((vid) => {
          return vid.id === videoData.video_id
        })

        if (index !== -1) {
          /* Kalo durasi udah abis hapus id nya */
          queueListVideo.value.splice(index, 1)
        }
      }

      /* Recheck, Setelah delete current video, check jika masih ada video di queue list
        maka jalan kan video tersebut
       */

      if (queueListVideo.value.length > 0) {
        const { id } = queueListVideo.value[0] /* putar urutan pertama */
        player.value.loadVideoById(id)
      }
    }

    createLogState(loggerContainer.value, createObjectVideoData)

    /* TODO:
        Ketika resume, logs nya jangan "Now Playing" tapi "Resuming"
    */

    // console.log('State Changed', logs.value)
  }

  onYouTubeIframeAPIReady()
})

async function runCommand () {
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

      /* !play blank */
      if (!youtubeId) {
        if (videoData.video_id) {
          /* TODO: ganti message agar bisa ngejalanin ketika diawal video (duration 0:00) */
          const currentVideoTimeDuration = player.value.getCurrentTime()

          if (currentVideoTimeDuration < 1) {
            player.value.playVideo()
            selectedCommand = command
          } else {
            selectedCommand = command
            message =
            'Cannot proceed because there is still video in the queue; instead, use command !resume to play the current video.'
            break
          }
        } else {
          selectedCommand = command
          message =
            'Cannot proceed because there is no link given by the user to the chat box.'
          break
        }
      } else {
        /* !play https://ytsomething.com?v=something */
        if (videoData.video_id && queueListVideo.value.length > 0) {
          /*
            TODO:
            Sepertinya butuh youtube api v3 untuk dapetin info video lengkap dengan id,

            ketika pertama kali nambahin video, push data dengan ytdetail api dari pada
            menggunakan getVideoData()
            */
          const videoDetailData = await getVideoDetail(youtubeId)
          console.log(videoDetailData)

          queueListVideo.value.push(videoDetailData)
          selectedCommand = command
          message = '📃 Video successfully added to the queue'
          break
        }

        player.value.loadVideoById(youtubeId)
        selectedCommand = command
      }
      break
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
    <div>{{ queueListVideo }}</div>
    <input type="text" v-model="userCommand" class="border-4 mt-20 w-full" />
    <input type="text" v-model="userName" class="border-4 mt-20 w-full" />
    <button @click="runCommand">send command</button>

    <div id="currentStatus" class="mt-10 px-2" ref="loggerContainer">
      <p class="text-2xl">test</p>
    </div>
  </div>
</template>
