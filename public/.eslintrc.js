// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-unused-expressions': 1,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'prefer-destructuring': 0,
    'object-shorthand': 0,
    'no-use-before-define': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 1,
    'no-return-await': 0,
    'no-plusplus': 0,
    'comma-dangle': [1, 'always-multiline'],
    'no-unused-vars': 1,
  }
}
