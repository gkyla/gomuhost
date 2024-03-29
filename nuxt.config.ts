/* eslint-disable no-undef */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    'nuxt-headlessui',
    'nuxt-socket-io'
  ],
  io: {
    server: {
      cors: {
        origin: [
        // whitelisted origins
          'http://localhost:3000'
        ]
      }
    },
    sockets: [
      { name: 'chat', default: true, url: 'http://localhost:3000' }
    ]
  },
  runtimeConfig: {
    youtubeApiKey: process.env.YOUTUBE_API_KEY
  },
  app: {
    head: {
      link: [
        {
          rel: 'preconnect', href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&family=Sofia+Sans+Semi+Condensed:wght@400;500&display=swap'
        }
      ],
      script: [
        {
          src: 'https://www.youtube.com/iframe_api', async: 'true'
        }
      ]
    }
  }
})
