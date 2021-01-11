<template>
  <div class="about">
    <div class="profile-img">
      <img src="~/assets/img/profile.jpg">
    </div>
    <div class="profile-title">
      <h1>Kanae Suzuki (@kanoe)</h1>
    </div>
    <div class="profile-text">
      <p>
        東京でWebエンジニアやってます。
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bottom-space: 60px;

.profile-img {
  text-align: center;
  margin-bottom: $bottom-space;

  img {
    border-radius: 50%;
  }
}

.profile-title {
  text-align: center;
  margin-bottom: $bottom-space;

  h1 {
    font-weight: 300;
  }
}

.profile-text {
  margin: 0 auto;
  max-width: 30rem;
}
</style>