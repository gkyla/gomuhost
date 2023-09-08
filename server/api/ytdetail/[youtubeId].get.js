import { endPointList } from '@/utils/endPointParser'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { YTdetail } = endPointList
  const { youtubeId } = event.context.params

  try {
    const data = await $fetch(YTdetail(config.youtubeApiKeys, youtubeId))

    return { data }
  } catch (errorObj) {
    const { code: statusCode, message: statusMessage } = errorObj.data.error

    throw createError({
      statusCode,
      statusMessage
    })
  }
})
