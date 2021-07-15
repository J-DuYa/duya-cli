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
console.log(` _____        _     _         ______ _       _____ 
(____ \      | |   | |       / _____) |     (_____)
 _   \ \ _   | |___| |___   | /     | |        _   
| |   | | | | \_____/ _  |  | |     | |       | |  
| |__/ /| |_| | ___( ( | |  | \_____| |_____ _| |_ 
|_____/  \____|(___)\_||_|   \______)_______|_____)
                                                   `)

program
  .option('-v')
  .description('duya cli 的版本号')

/* 查看 CLI 版本 */  
program
  .command('version')
  .description('duya cli 的版本号')
  .action(async () => {
    info(`duya cli 当前版本号:${await getVersion()}`);
  })

/* 发布区块、界面模版、应用 */  
program
  .command('publish [registry]')
  .description('该指令用于发布区块、界面模版、应用')
  .action((...args) => {
    let registry;

    const REGISTRT_REGEX = /^(registry=|REGISTRY=)/;
    const GIT_COMMIT_MESSAGE = /^(commit=|COMMIT=)/;
    
    args.forEach(cmd => {
      if (typeof cmd === 'string') {
        if (REGISTRT_REGEX.test(cmd)) {
          registry = cmd;
        }
      }
    });

    require('@libs/publish').call(this, {
      registry,
    });
  })

  /* 初始化区块、界面模版、应用 */
  program
    .command('init <dirname>')
    .description('初始化项目')
    .action(dirname => {
      console.log('dirname', dirname)
      require('@libs/init').call(this, dirname);
    })

commander.parse(process.argv);
