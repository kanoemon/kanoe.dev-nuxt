export default {
  modules: ['@nuxt/content', '@nuxtjs/sitemap'],
  components: true,
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
