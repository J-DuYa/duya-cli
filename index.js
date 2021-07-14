/**
 * 前端 CLI 工程化
 * 1. 需要实现的功能, 拉取应用模版
*/
require('module-alias/register');
const commander = require('commander');
const { info } = require('@logger');
const { getVersion } = require('@utils/version');
const { program } = commander;

// 读取 package.json 的版本号

program
  .option('-v')
  .description('duya cli 的版本号')

program
  .command('version')
  .description('duya cli 的版本号')
  .action(async () => {
    info(`duya cli 当前版本号:${await getVersion()}`);
  })

program
  .command('publish [registry] [commit]')
  .description('该指令用于发布区块、界面模版、应用')
  .action((...args) => {
    let registry, commit;

    const REGISTRT_REGEX = /^(registry=|REGISTRY=)/;
    const GIT_COMMIT_MESSAGE = /^(commit=|COMMIT=)/;
    
    args.forEach(cmd => {
      if (typeof cmd === 'string') {
        if (REGISTRT_REGEX.test(cmd)) {
          registry = cmd;
        } else if (GIT_COMMIT_MESSAGE.test(cmd)) {
          commit = cmd.replace(GIT_COMMIT_MESSAGE, '');
        }
      }
    });

    // 发布区块、界面模版、应用
    require('./libs/publish').call(this, {
      registry,
      commit,
    });
  })

commander.parse(process.argv);
