const { warning } = require('@logger');
const { publishOpts } = require('@config/config');
const { publishAll, publishDepository, publishNPM } = require('./publish');
const inquirer = require('inquirer');

/* 发布脚本 */
module.exports = async ({ registry }) => {
  // 为了广度使用支持发布到 github
  warning('为了广度使用支持发布到 github\n');

  // 到了当前目录下面
  const { operation } = await inquirer.prompt({
    type: 'list',
    message: '请选择发布方式',
    name: 'operation',
    choices: (publishOpts || []).map(({ name, value }) => ({
      key: value,
      name: name,
      value
    })),
    default: 'all'
  });

  switch (operation) {
    case 'all': // 全部应用
    case 'depository':
      publishDepository();
      break;
    case 'npm':
      publishNPM();
      break;
    default: 
      publishAll(registry);
  }
};