<template>
  <div class="index">
    <div class="profile">
      <div class="profile__img">
        <img src="~/assets/img/IMG_2362_3.JPG">
      </div>
      <div class="profile__text">
        <h1>Kanae Suzuki (@kanoe)</h1>
        <p>Web Engineer</p>
      </div>
      <div class="profile__sns">
        <ul>
          <li><a href="https://twitter.com/kanoe" target="_blank"><i class="fab fa-twitter"></i></a></li>
          <li><a href="https://github.com/kanoemon"><i class="fab fa-github"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  text-align: center;
  margin: 0 auto;
  max-width: 50rem;
  padding-top: 5rem;

  img {
    border-radius: 50%;
    width: 200px;
  }

  h1 {
    font-size: 1.5rem;
  }

  &__sns {
    font-size: 1.5rem;
    margin: 0 auto;
    width: 5rem;

    ul {
      display: flex;
      list-style: none;
      padding: 0;
    }

    li {
      padding-left: 10px;
    }
  }
}
</style>