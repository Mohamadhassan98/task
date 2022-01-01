<template>
  <v-app>
    <v-main>
      <div class="main-container">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>
<style lang="scss">
.main-container {
  max-width: unset;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.v-main__wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
