export function useObjectFormatter () {
  function simplifyVideoData (iframeContainer) {
    /* for loggin purposes */

    /*
      Data from object player.value.playerInfo.videoData
      is same with event.target.getVideoData()

        console.log(
          { ...player.value.playerInfo.videoData }
        )
        console.log({
          event: event.target.getVideoData()
        })
    */

    const videoData = iframeContainer.playerInfo.videoData

    return {
      playerState: iframeContainer.playerInfo.playerState,
      video_id: videoData.video_id,
      video_quality: videoData.video_quality,
      title: videoData.title,
      author: videoData.author
    }
  }

  return { simplifyVideoData }
}
