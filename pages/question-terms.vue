<template>
  <v-card width="100vw" height="100vh" class="wrapper">
    <v-card-title>درباره پرسشنامه</v-card-title>
    <v-card-subtitle>لطفاً متن زیر را با دقت بخوانید.</v-card-subtitle>
    <v-card-text class="terms">
      <p>{{ terms }}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn :x-large="!mobile" to="/questions" left color="primary">
        مرحله بعد
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { HelpApiFp } from '~/lib/api';

export default Vue.extend({
  name: 'Terms',
  data() {
    return {
      terms: '',
      mobile: window.innerWidth < 600,
    };
  },
  mounted() {
    if (!this.$store.state.signUp.participant?.mobile_number) {
      this.$router.replace('/login');
      return;
    }
    HelpApiFp()
      .helpQuestionHelpRead()
      .then(result =>
        result().then(result => {
          this.terms = result.data.text;
        })
      );
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.terms {
  border: 1px solid #000;
  margin-left: 32px;
  margin-right: 32px;
  width: calc(100% - 64px);
  p {
    text-align: justify;
    font-size: 16px;
    white-space: break-spaces;
  }

  padding: 16px 64px;
  overflow-y: auto;
}
</style>
