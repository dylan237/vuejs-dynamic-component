module.exports = {
  'src/**/*.{ts,tsx,js,jsx}': ['node_modules/.bin/ls-lint', 'yarn lint'],
  '*.+(json|css|md)': ['prettier --write'],
}
