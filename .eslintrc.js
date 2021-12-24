module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // 'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'prettier',
    '@nuxtjs',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  // required to lint *.vue files
  plugins: ['prettier', 'vue-scoped-css'],
  settings: {
    'import/ignore': ['vue'],
  },
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 0,
    indent: 0,
    camelcase: 0,
    'no-tabs': 1,
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'unicorn/number-literal-case': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': 0,
    'keyword-spacing': 0,
    'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
    'vue/html-indent': 0,
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'space-before-function-paren': 0,
    curly: ['error', 'multi-line'],
    'object-shorthand': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'no-mixed-operators': 'off',
    'no-use-before-define': 'off',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-array-constructor': 'off',
    'no-throw-literal': 'off',
    'accessor-pairs': 'off',
    'no-misleading-character-class': 'off',
    'no-prototype-builtins': 'off',
    'import/order': 'off',
    'vue-scoped-css/no-parsing-error': 'warn',
    'vue-scoped-css/no-unused-keyframes': 'warn',
    'vue-scoped-css/no-unused-selector': 'warn',
    'vue-scoped-css/require-selector-used-inside': 'warn',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
  },
};
