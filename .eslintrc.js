module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
}
