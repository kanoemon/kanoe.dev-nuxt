<template>
  <div>
    <div class="blog" v-for="(year, index) of years" :key="index">
      <h2>{{ year }}</h2>
      <articles :articles="articlesGroupBy[year]"></articles>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    formatDate(article) {
      let date = article.date || article.createdAt;
      let datetime = new Date(date);
      let month = datetime.getMonth() + 1;
      return `${datetime.getFullYear()}/${month.toString().padStart(2, 0)}/${datetime.getDate().toString().padStart(2, 0)}`;
    }
  },
  async asyncData({ $content, params }) {
    const articles = await $content('articles', {deep: true})
      .only(['title', 'slug', 'createdAt', 'date'])
      .sortBy('createdAt', 'desc')
      .sortBy('date', 'desc')
      .fetch()

    let articlesGroupBy = {};
    articles.forEach(article => {
      let date = article.date || article.createdAt;
      let year = new Date(date).getFullYear();

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
