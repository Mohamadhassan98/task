<template>
  <v-card width="100vw" height="100vh" class="wrapper">
    <v-card-title class="d-flex flex-column align-start">
      آموزش تست
      <v-divider class="divider" />
    </v-card-title>
    <v-card-text class="terms">
      <p>{{ terms }}</p>
      <div class="divider d-flex flex-column align-center">
        <img v-if="gif" :src="gif" alt="gif" />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn to="/task?training=true" color="primary">
        ورود به آزمون آزمایشی
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { HelpApiFp } from '~/lib/api';

export default Vue.extend({
  name: 'Test',
  data() {
    return {
      terms: '',
      gif: '',
    };
  },
  mounted() {
    if (!this.$store.state.signUp.participant?.mobile_number) {
      this.$router.replace('/login');
      return;
    }
    HelpApiFp()
      .helpHowDoTaskRead()
      .then(result =>
        result().then(result => {
          this.terms = result.data.text;
          this.gif = result.data.gif;
        })
      );
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.terms {
  margin-left: 32px;
  margin-right: 32px;
  width: calc(100% - 64px);
  p {
    text-align: justify;
  }
  padding-top: 16px;
  padding-bottom: 16px;
  overflow-y: auto;
}
.divider {
  width: 100%;
}
</style>
