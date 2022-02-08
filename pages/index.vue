<template>
  <div class="background">
    <div>{{ terms }}</div>
    <v-btn x-large to="/login" class="btn">ورود برای شرکت در پژوهش</v-btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { HelpApiFp } from '~/lib/api';

export default Vue.extend({
  layout: 'full-width',
  data() {
    return {
      terms: '',
    };
  },
  mounted() {
    HelpApiFp()
      .helpFirstPageRead()
      .then(result =>
        result().then(result => {
          this.terms = result.data.text;
        })
      );
  },
});
</script>
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
  > div {
    width: min(400px, 100vw - 32px);
    position: absolute;
    top: 20%;
    left: 12.5%;
    color: white;
    white-space: break-spaces;
    @include mobile-only {
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }
  .btn {
    position: absolute;
    top: 70%;
    left: 20%;
    @include mobile-only {
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      width: fit-content;
    }
  }
}
</style>
