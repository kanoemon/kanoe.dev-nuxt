<template>
  <div>
    <div class="blog" v-for="(year, index) of years" :key="index">
      <h2>{{ year }}</h2>
      <ul class="blog-articles">
        <li v-for="article of articlesGroupBy[year]" :key="article.slug" class="blog-articles__item">
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
  async asyncData({ $content, params }) {
    const articles = await $content('articles', {deep: true})
      .only(['title', 'description', 'img', 'slug', 'author', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()

    let thisYear = new Date().getFullYear();
    let years = [];
    for(var year = thisYear; year >= 2020; year--) {
      years.push(year);
    }

    let articlesGroupBy = {};
    articles.forEach(article => {
      let year = new Date(article.createdAt).getFullYear();
      if(typeof articlesGroupBy[year]=="undefined") articlesGroupBy[year]=[];
      articlesGroupBy[year].push(article);
    });

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

  &__item {
    font-size: 1.2rem;
    padding-bottom: 10px;
  }

  &__item:before {
    content: '-';
  }
}
</style>
