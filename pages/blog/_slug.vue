<template>
  <article class="article">
    <h1 class="article__title">{{ article.title }}</h1>
    <p class="article__meta">
      {{ formatDate(article) }} - 
      <span class="tags">
          <span v-for="tag of article.tags" :key="tag">
            <NuxtLink :to="`/blog/tags/${tag}`">
              #{{ tag }}
            </NuxtLink>
          </span>
      </span>
    </p>
    <nuxt-content :document="article" />

    <div class="tags">
      <ul>
        <li v-for="tag of article.tags" :key="tag">
          <NuxtLink :to="`/blog/tags/${tag}`">
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
    formatDate(article) {
      let date = article.date || article.createdAt;
      let datetime = new Date(date);
      let month = datetime.getMonth() + 1;
      return `${datetime.getFullYear()}/${month.toString().padStart(2, 0)}/${datetime.getDate().toString().padStart(2, 0)}`;
    }
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles', { deep: true })
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .sortBy('date', 'desc')
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
    font-size: 0.8rem;
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
  padding-bottom: 2rem;
  border-bottom: 1px solid $color-text-light;
  line-height: 2;

  a {
    color: $color-primary;
  }

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

  code {
    font-size: 0.9rem;
    font-family: $font-family-code;
  }

  p {
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

  .nuxt-content-highlight {
    position: relative;
  }
  .nuxt-content-highlight .filename {
    font-family: $font-family-code;
    position: absolute;
    right: 0;
    font-size: 0.9rem;
    color: #ccc;
    margin-top: 0.25rem;
    margin-right: 0.5rem;
  }
}

</style>
