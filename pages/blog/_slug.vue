<template>
  <article class="article">
    <h1 class="article__title">{{ article.title }}</h1>
    <p class="article__meta">
      {{ formatDate(article.createdAt) }} - 
      <span class="tags">
          <span v-for="tag of article.tags" :key="tag">
            <NuxtLink :to="`tags/${tag}`">
              #{{ tag }}
            </NuxtLink>
          </span>
      </span>
    </p>
    <nuxt-content :document="article" />

    <div class="tags">
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

<style lang="scss" scoped>
.article {
  &__title {
    font-size: 2.25rem;
    font-weight: 550;
    line-height: 1.4;
    margin-bottom: 0;
  }

  &__meta {
    margin-bottom: 40px;
    font-weight: 400;
    font-size: 0.75rem;
  }
}

.tags {
  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  li {
    padding-right: 10px;
  }
}

/** ブログ記事内 */
::v-deep .nuxt-content {
  font-weight: 500;

  h2, h3, h4, h5 {
    font-weight: 500;
  }

  h2 {
    border-bottom: 3px solid $color-primary;
    font-size: 1.5rem;
    margin: 2rem 0;
  }

  h3 {
    border-bottom: 1px solid $color-primary;
    margin: 2rem 0;
    font-size: 1.25rem;
  }

  p {
    line-height: 2;
    margin: 1.5rem 0;
  }

  .footnotes {
    font-size: 0.8rem;

    ol {
      padding-left: 15px;
    }  
  }  

  blockquote {
    position: relative;
    font-style: italic;
    margin: 2rem 0;
    padding: 30px 15px 8px 15px;
    border-left: 5px solid $color-primary;
    background-color: $color-base;

    &:before{
      display: inline-block;
      position: absolute;
      top: 5px;
      left: 3px;
      content: "“";
      font-family: $font-family-sans-seif;
      color: $color-primary;
      font-size: 4rem;
      line-height: 1;
    }
  }
}
</style>
