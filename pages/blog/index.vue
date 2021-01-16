<template>
  <div>
    <div class="blog" v-for="(year, index) of years" :key="index">
      <h2>{{ year }}</h2>
      <ul class="blog-articles">
        <li v-for="article of articlesGroupBy[year]" :key="article.slug" class="blog-articles__item">
          {{ formatDate(article.createdAt) }}
          <span class="separation">-</span>
          <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
            {{ article.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    formatDate(date) {
      let datetime = new Date(date);
      let month = datetime.getMonth() + 1;
      return `${datetime.getFullYear()}/${month.toString().padStart(2, 0)}/${datetime.getDate().toString().padStart(2, 0)}`;
    }
  },
  async asyncData({ $content, params }) {
    const articles = await $content('articles', {deep: true})
      .only(['title', 'slug', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()

    let articlesGroupBy = {};
    articles.forEach(article => {
      let year = new Date(article.createdAt).getFullYear();
      if(typeof articlesGroupBy[year]=="undefined") articlesGroupBy[year]=[];
      articlesGroupBy[year].push(article);
    });

    let thisYear = new Date().getFullYear();
    let years = [];
    for(var year = thisYear; year >= 2020; year--) {
      if (articlesGroupBy[year]) {
        years.push(year);
      }
    }

    return {
      articlesGroupBy,
      years
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-articles{
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
