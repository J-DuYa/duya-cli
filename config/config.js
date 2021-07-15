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
    { name: '同时发布到 npm 包管理仓库和代码仓库', value: 'all' },
    { name: '仅发布到 npm 包管理仓库', value: 'npm' },
    { name: '仅发布到代码仓库', value: 'depository' },
  ],
  // git commit msg 类型
  msg_types: [
    { name: 'feature', value: 'feature', desciption: '新增新功能' },
    { name: 'fix', value: 'fix', desciption: '修复缺陷' },
    { name: 'docs', value: 'docs', desciption: '仅仅修改了文档' },
    { name: 'style', value: 'style', desciption: '格式代码或者文档，不影响功能<影响的功能单独提出来>' },
    { name: 'refactor', value: 'refactor', desciption: '代码重构' },
    { name: 'perf', value: 'perf', desciption: '优化相关' },
    { name: 'test', value: 'test', desciption: '增加测试代码和模版' },
    { name: 'chore', value: 'chore', desciption: '构建过程或辅助工具的变动' },
  ],
  // program 项目类型
  concreteTypes: [
    { name: '普通项目', value: 'default' },
    { name: 'lerna 项目', value: 'lerna' }
  ],
};