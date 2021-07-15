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
  ],
  // git commit msg 类型
  msg_types: [
    { name: 'feature', value: 'feature', desciption: '新功能' },
    { name: 'fix', value: 'fix', desciption: '修复的内容' },
    { name: 'docs', value: 'docs', desciption: '文档' },
    { name: 'style', value: 'style', desciption: '格式代码或者文档，不影响功能<影响的功能单独提出来>' },
    { name: 'refactor', value: 'refactor', desciption: '具体的文件或模块' },
    { name: 'test', value: 'test', desciption: '增加测试代码和模版' },
    { name: 'chore', value: 'chore', desciption: '构建过程或辅助工具的变动' },
  ]
};