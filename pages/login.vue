<template>
  <v-form v-model="form" @submit.prevent="login">
    <v-card class="mx-auto mt-10 mb-10" width="500" outlined>
      <v-card-title>
        ورود <span class="help">(شماره تلفن همراه خود را وارد نمایید.)</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="mobile"
          class="ml-2"
          outlined
          dense
          single-line
          :rules="[$required, mobileValid]"
          label="شماره موبایل"
          :error-messages="date ? [date] : undefined"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn depressed color="primary" block :disabled="!form" type="submit">
          ورود
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { ParticipantApiFp, TaskRegister } from '~/lib/api';

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      mobile: '',
      form: false,
      mobileValid: (value: string) =>
        /^(0?)9\d{9}$/.test(value) || 'شماره وارد شده معتبر نیست.',
      date: '',
    };
  },
  watch: {
    mobile() {
      this.date = '';
    },
  },
  methods: {
    async login() {
      const { data } = await (
        await ParticipantApiFp().participantExistsRead(
          this.mobile.padStart(11, '0')
        )
      )();
      if (data.task_date) {
        this.date = `نوبت آزمون بعدی شما در تاریخ ${this.$options.filters?.formatDateTime(
          data.task_date
        )} می‌باشد.`;
        return;
      }
      this.$store.commit('setRegister', {
        participant: {
          mobile_number: this.mobile.padStart(11, '0'),
        },
      } as TaskRegister);
      if (data.is_exist) {
        this.$router.push('/test');
      } else {
        this.$router.push('/sign-up');
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.help {
  font-size: 14px;
  font-weight: 400 !important;
  color: #43464f;
  display: flex;
  align-items: center;
  line-height: 14px;
  margin-right: 4px;
}
</style>
