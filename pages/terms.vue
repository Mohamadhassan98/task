<template>
  <v-card width="100vw" height="100vh" class="wrapper">
    <v-card-title>قوانین و شرایط شرکت در پژوهش</v-card-title>
    <v-card-subtitle>لطفاً شرایط زیر را با دقت بخوانید.</v-card-subtitle>
    <v-card-text class="terms">
      <p>{{ terms }}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :x-large="!mobile"
        max-width="calc(100vw - 16px)"
        to="/introduce"
        left
        color="primary"
      >
        <span class="class">
          {{ submitText }}
        </span>
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
  computed: {
    submitText(): string {
      if (this.mobile) {
        return 'با تمامی شرایط و قوانین موافقم.';
      } else {
        return 'ضمن مطالعه دقیق متن فوق، با تمامی شرایط و قوانین این پژوهش موافقم.';
      }
    },
  },
  mounted() {
    if (!this.$store.state.signUp.participant?.mobile_number) {
      this.$router.replace('/login');
      return;
    }
    HelpApiFp()
      .helpTermsRead()
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
  }
  padding-top: 16px;
  padding-bottom: 16px;
  overflow-y: auto;
}
</style>
