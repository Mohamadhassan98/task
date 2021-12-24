<template>
  <v-card width="100vw" min-height="100vh" class="wrapper">
    <v-card-title class="d-flex flex-column align-center">
      با تشکر از مشارکت شما
    </v-card-title>
    <v-card-title class="d-flex flex-column align-start">
      نتایج پرسشنامه و آزمون حافظه شما
      <v-divider class="divider" />
    </v-card-title>
    <v-card-text class="terms">
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="text-center d-flex flex-column align-center font-weight-bold reaction"
        >
          <div style="width: 300px; height: 300px">
            <svg
              viewBox="0 0 300 300"
              preserveAspectRatio="xMinYMin meet"
              class="svg"
            >
              <circle
                r="140"
                cx="150"
                cy="150"
                fill="transparent"
                stroke-dasharray="880"
                stroke-dashoffset="0"
                class="mtx-bar-bg"
              />
              <circle
                r="140"
                cx="150"
                cy="150"
                fill="transparent"
                stroke-dasharray="880"
                stroke-dashoffset="880"
                transform="rotate(-90 150 150)"
                class="mtx-bar"
                :style="{
                  'stroke-dashoffset': 8.8 * (100 - $store.state.result.score),
                }"
              />
              <g>
                <text x="150" y="150" text-anchor="middle" dy="1em">
                  <tspan x="150" font-size="80" class="percent">
                    {{ $store.state.result.score }}٪
                  </tspan>
                </text>
              </g>
            </svg>
          </div>
          میانگین زمان عکس‌العمل شما:
          <br />
          {{ $store.state.result.reaction_time_mean }} میلی ثانیه
        </v-col>
        <v-col cols="12" md="5" class="text-center">
          {{ $store.state.result.text }}
        </v-col>
      </v-row>
      <v-row v-if="$store.state.result.next_date" align="center">
        <v-col cols="12" class="text-center date">
          با توجه به مشخصات این پژوهش، لطفاً در تاریخ زیر به همین سایت مراجعه و
          آزمون را دوباره تکرار کنید.
          <br />
          {{ $store.state.result.next_date | formatDateTime }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Introduce',
  data() {
    return {
      terms: '',
    };
  },
  mounted() {
    if (!this.$store.state.result?.score) {
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
.terms {
  margin-left: 32px;
  margin-right: 32px;
  width: calc(100% - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
}
.divider {
  width: 100%;
}
.mtx-bar {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #282828;
  font-weight: 400;
  line-height: 1.45;
  word-wrap: break-word;
  font-size: 18px;
  text-align: center;
  fill: transparent;
  stroke-dasharray: 879.65;
  box-sizing: border-box;
  stroke-width: 10px;
  stroke: #de7153;
}
.reaction {
  font-size: 24px;
  line-height: 54px;
}
.date {
  font-size: 18px;
}
</style>
