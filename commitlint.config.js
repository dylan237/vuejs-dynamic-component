// eslint-disable-next-line import/no-extraneous-dependencies
const getConfig = require('commitlint-config-cz/lib/config').get
const czConfig = require('./.cz-config')

const defaultConfig = {
  extents: ['@commitlint/config-conventional', 'cz'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always'],
  },
}

/* 自動將 .cz-config.js 中設定的的 types 注入至 defaultConfig rules['type-enum][2] */
const config = getConfig(czConfig, defaultConfig)

module.exports = config
