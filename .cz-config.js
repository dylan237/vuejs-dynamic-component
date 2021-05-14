/* example: https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js */

module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨  feat:      新功能',
    },
    {
      value: 'fix',
      name: '🐞  fix:       錯誤修復',
    },
    {
      value: 'docs',
      name: '🗒️   docs:      文件相關更改',
    },
    {
      value: 'refactor',
      name: '🛠   refactor:  無修復錯誤且無添加新功能的更改',
    },
    {
      value: 'perf',
      name: '🆙  perf:      提升效能的更改',
    },
    {
      value: 'test',
      name: '🏁  test:      增加測試或現有的測試更改',
    },
    {
      value: 'build',
      name: '🏭  build:     影響 build system 或是外部依賴的更改，如 npm、gulp..等',
    },
    {
      value: 'chore',
      name: '🗯   chore:     其他不會修改 src 或測試文件的更改',
    },
    {
      value: 'docs',
      name: '📚  docs:      文件相關',
    },
    {
      value: 'revert',
      name: '⏪  revert:    Revert a previous commit',
    },
    {
      value: 'WIP',
      name: '💪  WIP:       進行中尚未完成',
    },
  ],
  // message  驗證規則檔案: commitlint.config.js
  messages: {
    type: '[type] 更改的種類 (必填):',
    scope: '[scope] 更改的作用範圍 (可選):',
    customScope: '[customScope] Denote the SCOPE of this change (可選/小寫):',
    subject: '[subject] 標題 (必填):',
    body: '[body] 詳細描述 (使用 | 换行) (可選):',
    // 會讓舊版程式無法運行的更新
    breaking: '[breaking] Breaking Changes 描述 (可選):',
    footer: '[footer] 相關 issues 連結 (可選):',
    confirmCommit: '確認提交? (y/N)',
  },
  // scopes: [
  //   { name: 'scope1' },
  //   { name: 'scope2' },
  //   { name: 'scope3' },
  // ],
  // scopeOverrides: {
  //   fix: [
  //     { name: 'fixScope1' },
  //     { name: 'fixScope2' },
  //     { name: 'fixScope3' },
  //   ]
  // },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'chore'],
  subjectLimit: 100,
  skipQuestions: ['scope'],
  footerPrefix: '相關ISSUE:',
}
