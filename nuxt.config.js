import fa from 'vuetify/lib/locale/fa';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  server: {
    port: 12002,
    host: '0.0.0.0',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - task',
    title: 'task',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/formatters.ts',
    '~/plugins/moment.js',
    '~/plugins/validators.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { rtl: true }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes: {
        dark: {
          primary: '#90caf9',
          accent: '#424242',
          secondary: '#ce93d8',
          info: '#29b6f6',
          warning: '#ffa726',
          error: '#f44336',
          success: '#66bb6a',
          text: '#ffffff',
        },
        light: {
          primary: '#1976d2',
          accent: '#eeeeee',
          secondary: '#9c27b0',
          info: '#0288d1',
          warning: '#ED6C02',
          error: '#d32f2f',
          success: '#2e7d32',
          text: '#000000',
        },
      },
    },
    lang: {
      locales: { fa },
      current: 'fa',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
