export function useObjectFormatter () {
  function simplifyVideoData (iframeContainer) {
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
