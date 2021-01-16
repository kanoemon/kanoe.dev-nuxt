<template>
  <ul class="articles">
    <li v-for="article of articles" :key="article.slug" class="articles__item">
      {{ formatDate(article) }}
      <span class="separation">-</span>
      <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
        {{ article.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array
    }
  },
  methods: {
    formatDate(article) {
      let date = article.date || article.createdAt;
      let datetime = new Date(date);
      let month = datetime.getMonth() + 1;
      return `${datetime.getFullYear()}/${month.toString().padStart(2, 0)}/${datetime.getDate().toString().padStart(2, 0)}`;
    }
  },
}
</script>

<style lang="scss" scoped>
.articles{
  list-style: none;
  padding: 0;

  &__item {
    font-size: 1rem;
    margin: 0.5rem 0;

    .separation {
      padding: 0 0.5rem;
    }
  }
}
</style>
