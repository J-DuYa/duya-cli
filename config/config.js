module.exports = {
  // 配置 github 地址
  github: 'https://github.com/gamor-work',
  // https://github.com/gamor-work/vite-app-template.git
  templates: [
    { name: '应用模版', programName: 'vite-app-template', value: 'app' },
    { name: '区块模版', programName: 'vite-block-template', value: 'block' },
    { name: '界面模版', programName: 'vite-template-template', value: 'template' }
  ],
  // 发布操作
  publishOpts: [
    { name: 'npm 包管理仓库和代码仓库', value: 'all' },
    { name: 'npm 包管理仓库', value: 'npm' },
    { name: '仅代码仓库', value: 'depository' },
  ]
};