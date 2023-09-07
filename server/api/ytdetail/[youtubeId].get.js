export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { youtubeId } = event.context.params

  try {
    const data = await $fetch(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${config.youtubeApiKey}
        &part=snippet`)
    return { data }
  } catch (error) {
    throw createError({
      statusCode: error.data.statusCode,
      statusMessage: error.data.statusMessage
    })
  }
})
