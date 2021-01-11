<template>
  <article class="article">
    <h2>{{ article.title }}</h2>
    <p class="article__meta">{{ formatDate(article.createdAt) }}</p>
    <nuxt-content :document="article" />

    <prev-next :prev="prev" :next="next" />
  </article>
</template>

<script>
// https://dev.to/matthewblewitt/build-a-static-generated-blog-with-nuxt-v2-13-0-and-nuxt-content-387p

export default {
  methods: {
    formatDate(date) {
      let datetime = new Date(date);
      return `${datetime.getFullYear()}/${datetime.getMonth()+1}/${datetime.getDate()}`;
    }
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles', { deep: true })
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch();

    return {
      article, 
      prev,
      next
    };
  }
}
</script>

<style lang="scss" scoped>
.article {
  line-height: 30px;

  h2 {
    font-size: 2rem;
    font-weight: 400;
  }

  &__meta {
    margin-bottom: 40px;
    color: #959da5;
    font-weight: 400;
  }
}

</style>