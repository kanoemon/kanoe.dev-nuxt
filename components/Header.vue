<template>
  <header class="header">
    <div class="header__title">
      <NuxtLink to="/">kanoe.dev</NuxtLink>
    </div>
    <nav class="header__navi">
      <ul>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
  margin-bottom: 20px;
  &__title {
    font-size: 1rem;
    vertical-align: middle;
  }
}


ul {
  margin: 0;
  list-style: none;
  display: flex;
}

li {
  padding-left: 20px;
}
</style>