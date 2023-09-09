export const endPointList = {
  youtubeVideoDetail (youtubeApiKey, youtubeId) {
    return `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=snippet,statistics&key=${youtubeApiKey}&fields=items(id,snippet(channelId,title,publishedAt,channelTitle,thumbnails))`
  }
}
