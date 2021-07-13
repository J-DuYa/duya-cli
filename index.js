/**
 * 前端 CLI 工程化
 * 1. 需要实现的功能, 拉取应用模版
*/
const commander = require('commander');
const chalk = require('chalk');
const { getVersion } = require('./utils/version');

const { program } = commander;

// 读取 package.json 的版本号

program
  .command('version')
  .description('duya cli 的版本号')
  .action(async () => {
    console.log('duya cli 当前版本号:', chalk.red(await getVersion()));
  })

program
  .command('publish')
  .description('该指令用于发布区块、界面模版、应用')
  .action(() => {
    // 发布区块、界面模版、应用
    console.log('发布 --- ');
  })

commander.parse(process.argv);