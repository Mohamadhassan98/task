import 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $required: (value: string | undefined) => true | string;
    $range: (config: {
      min?: number;
      max?: number;
      type?: 'length' | 'compare';
    }) => (value: string) => true | string;
  }
}
