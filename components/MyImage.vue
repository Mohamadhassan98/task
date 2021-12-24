<template>
  <img ref="image" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Image',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const img = this.$refs.image as HTMLImageElement;
    img.src = this.src;
    img.onload = () => this.$emit('loaded');
  },
});
</script>
