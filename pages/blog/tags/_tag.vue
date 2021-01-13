<template>
  <div class="tags">
    <h2>#{{ tag }}</h2>
    <ul class="tags-articles">
      <li v-for="(article, index) of articles" :key="index" class="tags-articles__item">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    formatDate(date) {
      let datetime = new Date(date);
      return `${datetime.getFullYear()}/${datetime.getMonth()+1}/${datetime.getDate()}`;
    }
  },
  async asyncData({ $content, params }) {
    let tag = params.tag;

    const articles = await $content('articles', {deep: true})
      .where({ tags: { $contains: tag }})
      .only(['title', 'img', 'slug', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles,
      tag
    };
  }
}
</script>

<style lang="scss">
.tags-articles{
  list-style: none;

  &__item {
    font-size: 1.2rem;
    padding-bottom: 10px;
  }

  &__item:before {
    content: '-';
  }
}
</style>
