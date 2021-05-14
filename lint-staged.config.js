module.exports = {
  'src/**/*.{ts,tsx,js,jsx}': ['node_modules/.bin/ls-lint', 'yarn lint', 'git add'],
  '*.+(json|css|md)': ['prettier --write', 'git add'],
}
