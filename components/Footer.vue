<template>
  <footer class="footer">
    © {{ thisYear() }}. <NuxtLink to="/">kanoe.dev</NuxtLink>
  </footer>
</template>

<script>
export default {
  methods: {
    thisYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  font-size: 0.75rem;
  text-align: center;
  margin-top: 4rem;
}
</style>
