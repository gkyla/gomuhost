import { endPointList } from '@/utils/endPointParser'

export default defineEventHandler(async (event) => {
  /* TODO:
    add support for youtube link too, not only the id
  */
  const config = useRuntimeConfig()
  const { youtubeVideoDetail } = endPointList
  const { youtubeId } = event.context.params

  try {
    const data = await $fetch(youtubeVideoDetail(config.youtubeApiKey, youtubeId))
    return { data }
  } catch (errorObj) {
    const { code: statusCode, message: statusMessage } = errorObj.data.error

    throw createError({
      statusCode,
      statusMessage
    })
  }
})
