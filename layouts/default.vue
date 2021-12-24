<template>
  <v-app>
    <v-main>
      <div class="main-container">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
<style lang="scss">
.main-container {
  max-width: 1280px;
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
