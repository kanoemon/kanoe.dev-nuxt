<template>
  <article class="article">
    <h2>{{ article.title }}</h2>
    <p class="article__meta">{{ formatDate(article.createdAt) }}</p>
    <nuxt-content :document="article" />

    <div class="article__tags">
      <ul>
        <li v-for="tag of article.tags" :key="tag">
          <NuxtLink :to="`tags/${tag}`">
            #{{ tag }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <prev-next :prev="prev" :next="next" />
  </article>
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
    const article = await $content('articles', params.slug).fetch()
    console.log(article);

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

<style lang="scss">
$bottom-space: 60px;

.article {
  line-height: 2.3;

  blockquote {
    position: relative;
    font-style: italic;
    background: #efefef;
    margin: 30px 0;
    padding: 30px 15px 8px 15px;
    font-size: 0.9rem;
  }

  blockquote:before{
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 3px;
    content: "“";
    font-family: sans-serif;
    color: #cfcfcf;
    font-size: 70px;
    line-height: 1;
}

  .footnotes {
    font-size: 0.8rem;
  }  

  .footnotes ol {
    padding-left: 15px;
  }  

  h2 {
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.2;
  }

  &__meta {
    margin-bottom: 40px;
    color: #959da5;
    font-weight: 400;
    font-size: 0.9rem;
  }

  &__tags {
    margin-bottom: $bottom-space;
  }

  &__tags ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  &__tags li {
    padding-right: 10px;
  }
}

.nuxt-content-container {
  margin-bottom: $bottom-space;

  h2 {
    border-bottom: 3px solid #5bc8ac;
  }
}
</style>
