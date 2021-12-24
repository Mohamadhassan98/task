<template>
  <v-card width="100vw" min-height="100vh" class="wrapper">
    <v-card-title class="d-flex flex-column align-start">
      آموزش تست
      <v-divider class="divider" />
    </v-card-title>
    <v-card-text class="d-flex flex-column align-center">
      <v-progress-circular v-show="!current" indeterminate />
      <my-image
        v-for="image in info.images"
        v-show="current === image.id"
        :key="image.id"
        :src="image.picture"
        class="image"
        @loaded="imageLoaded(image.id)"
        @click="imageClick"
      />
      <v-progress-linear
        v-if="progress !== null"
        v-model="progress"
        :height="20"
        class="loading-image"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn to="/continue" color="primary"> ورود به آزمون آزمایشی </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { TaskInfo, TrainingGenerateApiFp } from '~/lib/api';

export default Vue.extend({
  name: 'Continue',
  data() {
    return {
      info: {
        images: [],
        orders: [],
      } as TaskInfo,
      loaded: new Set<number>(),
      loadedCount: 0,
      current: null as number | null,
      timer: null as null | number,
      currentIndex: null as number | null,
      progress: null as number | null,
      interval: null as number | null,
      apply: [] as { image: number; start: number; end: number | null }[],
    };
  },
  watch: {
    loadedCount(val) {
      if (val === this.info.images.length) {
        this.nextImage();
      }
    },
  },
  mounted() {
    document.onkeydown = ev => {
      if (ev.key === ' ') {
        this.repeated();
        this.nextImage();
      }
    };
    TrainingGenerateApiFp()
      .trainingGenerateRead()
      .then(res =>
        res().then(res => {
          this.info = res.data;
        })
      );
  },
  methods: {
    nextImage() {
      const current = this.info.orders[this.currentIndex || 0];
      this.current = current;
      const newIndex = (this.currentIndex || 0) + 1;
      this.currentIndex = newIndex;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.interval) {
        clearInterval(this.interval);
      }
      if (newIndex === this.info.orders.length + 1) {
        this.progress = null;
        document.onkeydown = null;
        const result = this.apply.map(a => ({
          image: a.image,
          reaction_time: a.end === null ? null : a.end - a.start,
        }));
        console.log(result);
        return;
      }
      this.apply = [
        ...this.apply,
        {
          image: current,
          start: new Date().getTime(),
          end: null,
        },
      ];
      this.progress = 0;
      this.interval = window.setInterval(() => {
        this.progress = (this.progress || 1) + 1;
      }, 30);
      this.timer = window.setTimeout(() => {
        this.nextImage();
      }, 3000);
    },
    repeated() {
      this.apply[this.apply.length - 1].end = new Date().getTime();
    },
    imageLoaded(id: number) {
      this.loadedCount = this.loaded.add(id).size;
    },
    imageClick() {
      if (window.innerWidth > 768) {
        return;
      }
      this.repeated();
      this.nextImage();
    },
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #c8cfd7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.divider {
  width: 100%;
}
.loading-image {
  transition-duration: 30ms;
}
.image {
  width: 500px;
  height: auto;
  margin-bottom: 20px;
}
</style>
