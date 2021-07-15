const { warning } = require('@logger');
const { publishOpts } = require('@config/config');
const npm = require('./npm');
const push = require('./github');
const inquirer = require('inquirer');

/* 发布脚本 */
module.exports = async ({ registry, commit }) => {
  // 为了广度使用支持发布到 github
  warning('为了广度使用支持发布到 github\n');

  // 到了当前目录下面
  const { operation } = await inquirer.prompt({
    type: 'list',
    message: '请输入项目名称',
    name: 'operation',
    choices: (publishOpts || []).map(({ name, value }) => ({
      key: value,
      name: name,
      value
    })),
    default: 'all'
  });

  switch (operation) {
    case 'all':
      await npm(registry);
      await push(commit);
      break;
    case 'depository':
      await push(commit);
      break;
    case 'npm':
      await npm(registry);
      break;
    default: 
      await npm(registry);
      await push(commit);
  }
};