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
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/86ced1b7f3.js',
        crossorigin: 'anonymous'
      }
    ]
  },
  sitemap: {
    hostname: 'https://kanoe.dev',
    routes: async() => {
      const { $content } = require('@nuxt/content')
      const articles = await $content('articles').only(['path', 'slug']).fetch()

      return articles.map(article => '/blog/' + article.slug)
    }
  }
}
