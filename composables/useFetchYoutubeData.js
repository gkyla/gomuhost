export function useFetchYoutubeData () {
  async function getVideoDetail (youtubeId) {
    const { data, error } = await useFetch(`/api/ytdetail/${youtubeId}`)

    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage
      })
    }
    return { ...data.value }
  }

  return { getVideoDetail }
}
