module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  rules: {
    semi: ['error', 'never'],
    'no-return-assign': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
}
