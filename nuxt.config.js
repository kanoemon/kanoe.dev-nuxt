export default {
  modules: [
    '@nuxt/content', 
    '@nuxtjs/sitemap', 
    '@nuxtjs/style-resources'
  ],
  components: true,
  styleResources: {
    scss: [
      '@/assets/scss/_variable.scss'
    ]
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css'
      }
    }
  },
  head: {
    title: 'kanoe.dev',
    meta: [
      { charset: 'utf-8' }
    ]
  }
}
