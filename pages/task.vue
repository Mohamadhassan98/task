<template>
  <v-card width="100vw" min-height="100vh" class="wrapper">
    <v-card-title class="d-flex flex-column align-start">
      آزمون {{ $route.query.training ? 'آزمایشی' : 'اصلی' }}
      <v-divider class="divider" />
    </v-card-title>
    <v-card-text
      class="d-flex flex-column align-center justify-center flex-grow-1"
    >
      <template v-if="!current && !loadingState">
        <div class="text-center my-16 loading-text">
          <span v-if="!currentIndex">در حال بارگیری تصاویر هستیم.</span>
          <br />
          لطفاً منتظر بمانید.
        </div>
        <v-progress-circular indeterminate size="64" />
      </template>
      <span v-if="loadingState" class="loader">
        {{ loadingState }}
      </span>
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
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  ApplyApiFp,
  GenerateApiFp,
  TaskInfo,
  TrainingGenerateApiFp,
} from '~/lib/api';

export default Vue.extend({
  name: 'Task',
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
      loadingInterval: null as number | null,
      loadingState: '',
    };
  },
  watch: {
    loadedCount(val) {
      if (this.loadingInterval) {
        return;
      }
      if (val === this.info.images.length) {
        this.loadingState = '3';
        this.$nextTick(() => {
          this.loadingInterval = window.setInterval(() => {
            if (this.loadingState && isNaN(+this.loadingState)) {
              clearInterval(this.loadingInterval || 0);
              this.loadingState = '';
              this.loadingInterval = null;
              this.nextImage();
            } else {
              this.loadingState = (+this.loadingState - 1 || 'شروع').toString();
            }
          }, 1000);
        });
      }
    },
  },
  mounted() {
    if (!this.$store.state.signUp.participant?.mobile_number) {
      this.$router.replace('/login');
      return;
    }
    document.onkeydown = ev => {
      if (ev.key === ' ') {
        this.repeated();
        this.nextImage();
      }
    };
    if (this.$route.query.training) {
      TrainingGenerateApiFp()
        .trainingGenerateRead()
        .then(res =>
          res().then(res => {
            this.info = res.data;
            this.loadedCount = 5;
          })
        );
    } else {
      GenerateApiFp()
        .generateRead()
        .then(res =>
          res().then(res => {
            this.info = res.data;
          })
        );
    }
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
        if (this.$route.query.training) {
          this.$router.push('/actual-training');
        } else {
          ApplyApiFp()
            .applyCreate({
              mobile_number: this.$store.state.signUp.participant.mobile_number,
              reaction_times: result,
            })
            .then(res =>
              res().then(res => {
                this.$store.commit('setResult', res.data);
                this.$router.push('/result');
              })
            );
        }
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
  background-color: #e3e3e3;
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
  width: auto;
  max-width: 100vw;
  max-height: min(500px, 100vh - 150px);
  margin-bottom: 20px;
}
.loader {
  font-weight: 700;
  font-size: 48px;
  text-align: center;
}
.loading-text {
  font-size: 20px;
}
</style>
