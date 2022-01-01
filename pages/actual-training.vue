<template>
  <v-card width="100vw" height="100vh" class="wrapper">
    <v-card-title class="d-flex flex-column align-start">
      شما مرحله آزمایشی را با موفقیت پشت سر گذاشتید.
      <v-divider class="divider" />
    </v-card-title>
    <v-card-text class="d-flex flex-column align-center">
      <v-btn x-large color="primary" to="/task" class="mt-16 mb-16">
        ورود به مرحله اصلی آزمون
      </v-btn>
      <v-btn x-large color="secondary" to="/task?training=true">
        انجام مجدد مرحله آزمایشی
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ActualTraining',
  mounted() {
    if (!this.$store.state.signUp.participant?.mobile_number) {
      this.$router.replace('/login');
    }
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.divider {
  width: 100%;
}
</style>
