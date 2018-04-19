/* .eslintrc.js */
module.exports = {
    extends: '@sunl-fe/eslint-config-sunlands',
    globals: {
        React: true,
        _: true
    },
    rules: {
        'react/prop-types': 'never',
        'eol-last': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'max-len': ['warn', 160],
        'no-sequences': 'warn',
        'react/jsx-no-undef': 'warn'
    }
}
