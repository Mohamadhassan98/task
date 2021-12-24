<template>
  <div class="background">
    <v-btn x-large to="/login" class="btn">ورود برای شرکت در پژوهش</v-btn>
  </div>
</template>
<style lang="scss" scoped>
.background {
  background-image: url('/back.jpg');
  @include mobile-only {
    background-image: url('/back-m.jpg');
    //background-size: contain;
    background-position-y: center;
  }
  max-width: 100vw;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position-x: center;
  .btn {
    position: absolute;
    top: 70%;
    left: 20%;
  }
}
</style>
