<template>
  <v-card width="100vw" min-height="100vh" class="wrapper">
    <v-card-title class="d-flex flex-column align-center">
      با تشکر از مشارکت شما در این پژوهش
    </v-card-title>
    <v-card-title class="d-flex flex-column align-start">
      نتایج آزمون حافظه رویدادی شما
      <v-divider class="divider" />
    </v-card-title>
    <v-card-text class="terms">
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="text-center d-flex flex-column align-center font-weight-bold reaction"
        >
          <div style="width: 300px; height: 300px" class="mb-12">
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
                  <tspan x="150" font-size="80">
                    {{ $store.state.result.score }}٪
                  </tspan>
                </text>
                <text x="150" y="180" text-anchor="middle" dy="1em">
                  <tspan>امتیاز به دست آمده</tspan>
                </text>
              </g>
            </svg>
          </div>
          <div class="border">
            میانگین زمان عکس‌العمل شما:
            <br />
            {{ $store.state.result.reaction_time_mean }} میلی ثانیه
          </div>
        </v-col>
        <v-col cols="12" md="6" class="text-justify terms break">
          {{ $store.state.result.text }}
        </v-col>
      </v-row>
      <v-row v-if="$store.state.result.next_date" align="center">
        <v-col cols="12" class="text-center date">
          با توجه به روش تحقیق این پژوهش، لطفاً در تاریخ زیر به همین سایت مراجعه
          و آزمون را دوباره تکرار کنید.
          <br />
          <span>{{ $store.state.result.next_date | formatDateTime }}</span>
        </v-col>
        <v-col cols="12" class="d-flex">
          <v-spacer />
          <v-btn large to="/">خروج</v-btn>
          <v-spacer />
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
    this.$store.commit('resetRegister');
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.terms {
  width: 100%;
  padding: 16px 32px;
  font-size: 18px;
}
.break {
  white-space: break-spaces;
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
  border: 1px solid black;
  padding: 16px;
  background-color: var(--v-info-lighten4);
  span {
    font-size: 24px;
    font-weight: 600;
  }
}
.border {
  border: 1px solid black;
  padding: 16px;
}
</style>
