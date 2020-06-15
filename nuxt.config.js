module.exports = {
  /*
  ** Headers of the page
  */
  preload: false,
  head: {
    title: 'PanXpan – Expand Globally',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An online platform allowing manufacturers to find and work with local partners all over the world' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' }
    ]
  },
  css: [
    '~/assets/style.css'
  ],
  modules: [
    '@nuxtjs/bootstrap-vue',
  ],
  generate: {
    minify: {
      conservativeCollapse: true
    },
    fallback: '/error'
  },
  env: {
    /*prod
    baseUrl: 'https://pxp.panxpan.com',
    appUrl: 'https://app.panxpan.com/' */
    /*dev*/
    baseUrl: 'https://pxpdev.panxpan.com',
    appUrl: 'https://apppxpdev.panxpan.com/'
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/error.vue')
      })
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
