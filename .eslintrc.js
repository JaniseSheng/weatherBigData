// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
      'no-unused-vars': 1,
      'no-multiple-empty-lines': 1,
      'padded-blocks': 0,
      'eqeqeq': 0,
      'indent': 0,
      'no-new': 0,
      'new-cap': 0,
      'comma-spacing': 0,
      'arrow-spacing': 0,
      'arrow-parens': 0,
      'semi': 0,
      'no-multi-str': 0,
      'no-undef': 0,
      'space-before-blocks': 0,
      'no-dupe-keys': 0,
      'generator-star-spacing': 0,
      'space-before-function-paren': 0,
      'no-throw-literal':0,
      'no-unreachable':0,
      'camelcase': 0,
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'object-property-newline':0,
      'key-spacing':0,
      'spaced-comment':0,
      'no-tabs': 0,
      'no-unneeded-ternary': 0,
      'no-mixed-spaces-and-tabs': 0,
      'no-multiple-empty-lines':0,
      'space-in-parens':0,
      'no-unused-vars':0,
      'no-mixed-operators':0,
      'no-unused-expressions':0,
      'prefer-promise-reject-errors':0,
      'no-useless-return':0
    }
}
