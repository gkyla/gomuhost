export const endPointList = {
  YTdetail (youtubeApiKey, youtubeId) {
    return `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${youtubeApiKey}
            &part=snippet`
  }
}
