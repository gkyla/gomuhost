/* eslint-disable no-undef */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    'nuxt-headlessui'
  ],
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
