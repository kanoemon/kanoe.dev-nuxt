<template>
  <div class="tags">
    <h1 class="tags__title">#{{ tag }}</h1>
    <articles :articles="articles"></articles>
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
      .only(['title', 'slug', 'createdAt', 'date'])
      .sortBy('createdAt', 'desc')
      .sortBy('date', 'desc')
      .fetch()

    return {
      articles,
      tag
    };
  }
}
</script>

<style lang="scss">
.tags {
  &__title {
    font-size: 2.25rem;
    font-weight: 550;
    line-height: 1.4;
    margin-bottom: 2rem;
  }
}
</style>
